import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { colors } from '../../styles/colors';
import ProgressBar from '../common/ProgressBar';

const AudioPlayer = ({ audioUrl, onAudioFinished, autoPlay = false, countdown = 5 }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [countdownTime, setCountdownTime] = useState(countdown);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const countdownInterval = useRef(null);
  const isMounted = useRef(true);

  // Nettoyer les ressources
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (sound) {
        sound.unloadAsync().catch(console.error);
      }
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
        countdownInterval.current = null;
      }
    };
  }, [sound]);

  // Charger l'audio quand le composant est monté
  useEffect(() => {
    if (audioUrl) {
      loadAudio();
    }
  }, [audioUrl]);

  // Optimisation du callback pour éviter les re-créations
  const onPlaybackStatusUpdate = useCallback((status) => {
    if (!isMounted.current) return;
    
    if (status.isLoaded) {
      setCurrentTime(Math.floor(status.positionMillis / 1000));
      if (status.durationMillis) {
        setDuration(Math.floor(status.durationMillis / 1000));
      }
      
      if (status.didJustFinish) {
        setIsPlaying(false);
        if (onAudioFinished) onAudioFinished();
      }
    } else if (status.error) {
      console.error('Erreur de lecture:', status.error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [onAudioFinished]);

  // Compte à rebours avant lecture automatique
  useEffect(() => {
    // Nettoyer l'interval existant
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
  
    // Démarrer le compte à rebours quand autoPlay=true et audio chargé
    if (autoPlay && isLoaded && isMounted.current) {
      console.log('🎯 Démarrage du compte à rebours');
      setShowCountdown(true);
      setCountdownTime(countdown);
      
      countdownInterval.current = setInterval(() => {
        if (!isMounted.current) {
          if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
          }
          return;
        }
        
        setCountdownTime(prev => {
          console.log('⏰ Compte à rebours:', prev);
          if (prev <= 1) {
            setShowCountdown(false);
            playAudio();
            if (countdownInterval.current) {
              clearInterval(countdownInterval.current);
              countdownInterval.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  
    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
        countdownInterval.current = null;
      }
    };
  }, [autoPlay, isLoaded, countdown]);

  const loadAudio = async () => {
    if (!isMounted.current) return;
    
    try {
      setIsLoading(true);
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { 
          shouldPlay: false, 
          isLooping: false,
          volume: 1.0,
        },
        onPlaybackStatusUpdate
      );

      if (isMounted.current) {
        setSound(newSound);
        setIsLoaded(true);
        setIsLoading(false);
      } else {
        // Si le composant a été démonté, nettoyer l'audio
        newSound.unloadAsync().catch(console.error);
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement audio:', error);
      if (isMounted.current) {
        setIsLoading(false);
        Alert.alert('Erreur Audio', 'Impossible de charger le fichier audio');
      }
    }
  };

  const playAudio = useCallback(async () => {
    if (sound && isLoaded && isMounted.current) {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && isMounted.current) {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Erreur lors de la lecture:', error);
        if (isMounted.current) {
          Alert.alert('Erreur', 'Impossible de lire le fichier audio');
        }
      }
    }
  }, [sound, isLoaded]);

  const pauseAudio = useCallback(async () => {
    if (sound && isMounted.current) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error('Erreur lors de la pause:', error);
      }
    }
  }, [sound]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  const restartAudio = useCallback(async () => {
    if (sound && isMounted.current) {
      try {
        await sound.setPositionAsync(0);
        setCurrentTime(0);
        if (isPlaying) {
          await sound.playAsync();
        }
      } catch (error) {
        console.error('Erreur lors du redémarrage:', error);
      }
    }
  }, [sound, isPlaying]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  if (showCountdown) {
    return (
      <View style={styles.countdownContainer}>
        <View style={styles.countdownCircle}>
          <Text style={styles.countdownText}>{countdownTime}</Text>
        </View>
        <Text style={styles.countdownLabel}>Audio startet automatisch in...</Text>
      </View>
    );
  }

  return (
    <View style={styles.audioContainer}>
      <View style={styles.playerContainer}>
        <TouchableOpacity 
          style={[styles.playButton, { opacity: (isLoading || !isLoaded) ? 0.5 : 1 }]} 
          onPress={togglePlayPause}
          disabled={isLoading || !isLoaded}
        >
          {isLoading ? (
            <Ionicons name="hourglass" size={24} color={colors.white} />
          ) : (
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color={colors.white} 
            />
          )}
        </TouchableOpacity>

        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                }
              ]}
            />
          </View>
        </View>

        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        <TouchableOpacity onPress={restartAudio} disabled={!isLoaded} style={styles.restartButton}>
          <Ionicons name="refresh" size={20} color={isLoaded ? colors.gray : colors.lightGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {isLoading ? 'Chargement...' : 
           !isLoaded ? 'Erreur de chargement' : 
           isPlaying ? 'En lecture' : 'Prêt'}
        </Text>
      </View>
    </View>
  );
};

const ExerciseView = ({
  selectedUbung,
  currentAudioIndex,
  selectedAnswers,
  levelInfo,
  currentExerciseNumber,
  totalExercises,
  onBack,
  onNextAudio,
  onPreviousAudio,
  onSelectAnswer,
  onFinishExercise,
  isStartAudioPlaying = false,
  startAudioFinished = false
}) => {
  const [audioStarted, setAudioStarted] = useState(false);

  // Memoiser les données pour éviter les re-calculs
  const currentAudio = useMemo(() => {
    return selectedUbung?.data?.[currentAudioIndex];
  }, [selectedUbung, currentAudioIndex]);

  // Debug logs
  console.log('🔍 ExerciseView Debug:');
  console.log('selectedUbung:', selectedUbung);
  console.log('currentAudioIndex:', currentAudioIndex);
  console.log('currentAudio:', currentAudio);
  console.log('audioStarted:', audioStarted);
  console.log('questions:', currentAudio?.questions);

  // Reset audio state when changing audio
  useEffect(() => {
    setAudioStarted(false);
  }, [currentAudioIndex]);

  const handleAudioFinished = useCallback(() => {
    setAudioStarted(true);
  }, []);

  const showQuestionsManually = useCallback(() => {
    setAudioStarted(true);
  }, []);

  // Memoiser le calcul pour éviter les re-calculs inutiles
  const allQuestionsAnswered = useMemo(() => {
    if (!currentAudio?.questions) return false;
    return currentAudio.questions.every((_, index) => 
      selectedAnswers[index] !== undefined
    );
  }, [currentAudio?.questions, selectedAnswers]);

  // Optimiser l'effet avec une dépendance stable
  useEffect(() => {
    if (allQuestionsAnswered && onFinishExercise) {
      onFinishExercise();
    }
  }, [allQuestionsAnswered, onFinishExercise]);

  // Vérifier si currentAudio existe avant le rendu
  if (!currentAudio) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement de l'exercice...</Text>
      </View>
    );
  }
  
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.exerciseCounter}>
          <ProgressBar 
            currentIndex={currentExerciseNumber || 1}
            totalCount={totalExercises || 1}
            height={8}
            backgroundColor="#E5E5E5"
            progressColor={colors.primary}
          />
        </View>
        <TouchableOpacity>
          {/* Espace pour équilibrer le header */}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.exerciseContent}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Lecteur Audio */}
        <View style={styles.audioSection}>
          <AudioPlayer
            key={currentAudio.audioUrl}
            audioUrl={currentAudio.audioUrl}
            onAudioFinished={handleAudioFinished}
            autoPlay={startAudioFinished}
            countdown={10}
          />
        </View>

        {/* Questions */}
        <View style={styles.questionsSection}>
          {currentAudio.questions?.map((question, questionIndex) => {
            const isAnswered = selectedAnswers[questionIndex] !== undefined;
            
            return (
              <View key={`${question.id || questionIndex}`} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionTitle}>
                    Frage {currentAudio.questions?.length !== 1 ? questionIndex + 1 : ""}
                  </Text>
                  {isAnswered && (
                    <View style={styles.answeredBadge}>
                      <Ionicons name="checkmark" size={16} color={colors.white} />
                    </View>
                  )}
                </View>
                
                <Text style={styles.questionText}>
                  {question.title}
                </Text>
                
                <View style={styles.optionsContainer}>
                  {question.options?.map((option) => {
                    const isSelected = selectedAnswers[questionIndex] === option.id;
                    
                    return (
                      <TouchableOpacity
                        key={`${option.id}-${questionIndex}`}
                        style={[
                          styles.optionButton,
                          isSelected && styles.optionSelected
                        ]}
                        onPress={() => onSelectAnswer(questionIndex, option.id)}
                      >
                        <View style={[
                          styles.optionCircle,
                          isSelected && styles.optionCircleSelected
                        ]}>
                          {isSelected && (
                            <View style={styles.optionDot} />
                          )}
                        </View>
                        <Text style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected
                        ]}>
                          ({option.id.toUpperCase()}) {option.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* Statut de progression */}
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {Object.keys(selectedAnswers).length} von {currentAudio.questions?.length || 0} Fragen beantwortet
          </Text>
        </View>
      </ScrollView>

      {/* Bouton sticky "Beenden" */}
      <View style={[styles.stickyButtonContainer, {opacity: allQuestionsAnswered ? 1 : 0}]}>
        <TouchableOpacity 
          style={[
            styles.stickyButton, 
            { 
              backgroundColor: allQuestionsAnswered ? colors.primary : colors.gray,
              opacity: allQuestionsAnswered ? 1 : 0
            }
          ]}
          onPress={onFinishExercise}
          disabled={!allQuestionsAnswered}
        >
          <Text style={styles.stickyButtonText}>
            {allQuestionsAnswered ? 'BEENDEN' : 'ALLE FRAGEN BEANTWORTEN'}
          </Text>
          <Ionicons name="checkmark-circle" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </>
  );
};

// Styles restent identiques...
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6D6DB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exerciseCounter: {
    paddingHorizontal: 16,
    marginLeft:12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 250, 
    maxWidth: 300, 
  },
  exerciseCounterText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  exerciseContent: {
    backgroundColor: colors.background,
  },
  
  // Styles pour le lecteur audio
  audioSection: {
    margin: 16,
    marginBottom: 8,
  },
  countdownContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  countdownCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  countdownLabel: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
  audioContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    padding: 8,
    gap: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDisplay: {
    minWidth: 40,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  restartButton: {
    padding: 4,
  },
  statusContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: colors.gray,
  },

  instructionBox: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  instructionContent: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 20,
  },
  skipButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // Styles pour les questions
  questionsSection: {
    marginHorizontal: 16,
  },
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  answeredBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  optionSelected: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCircleSelected: {
    borderColor: 'white',
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
  progressInfo: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: '8%',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stickyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  stickyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
});

export default ExerciseView;