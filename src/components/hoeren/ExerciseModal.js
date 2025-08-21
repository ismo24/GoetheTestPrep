import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Modal, View, StyleSheet, StatusBar, Platform } from 'react-native';
import ExerciseView from './ExerciseView';
import ResultsView from './ResultsView';
import { colors } from '../../styles/colors';
import { Audio } from 'expo-av';

const ExerciseModal = ({
  visible,
  showResults,
  selectedExercise,
  selectedAnswers,
  exerciseResults,
  levelInfo,
  availableExercises,
  onClose,
  onSelectAnswer,
  onFinishExercise,
  onRestart,
  onNextExercise,
  userNativeLanguage = "FR" 
}) => {
  const [isStartAudioPlaying, setIsStartAudioPlaying] = useState(false);
  const [startAudioFinished, setStartAudioFinished] = useState(false);
  const startAudioRef = useRef(null);
  const isMounted = useRef(true);

  // Adapter l'exercice pour ExerciseView - memoizé pour éviter les re-créations
  const adaptedExercise = useMemo(() => {
    if (!selectedExercise) return null;
    
    return {
      ...selectedExercise,
      data: [{
        audioUrl: selectedExercise.data?.audioUrl,
        questions: selectedExercise.data?.questions || []
      }]
    };
  }, [selectedExercise]);

  // Memoiser les calculs d'index
  const { currentExerciseIndex, hasNextExercise, currentExerciseNumber, totalExercises } = useMemo(() => {
    if (!availableExercises || !selectedExercise) {
      return {
        currentExerciseIndex: -1,
        hasNextExercise: false,
        currentExerciseNumber: 1,
        totalExercises: 1
      };
    }

    const index = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
    return {
      currentExerciseIndex: index,
      hasNextExercise: index < availableExercises.length - 1,
      currentExerciseNumber: index + 1,
      totalExercises: availableExercises.length
    };
  }, [availableExercises, selectedExercise]);

  // Effet pour gérer l'ouverture/fermeture du modal
  useEffect(() => {
    isMounted.current = true;
    
    if (visible && !showResults) {
      setIsStartAudioPlaying(false);
      setStartAudioFinished(false);
      // Lancer l'audio de démarrage ET déclencher le compte à rebours en même temps
      playStartAudio();
      setStartAudioFinished(true); // On dit tout de suite que c'est fini pour déclencher le compte à rebours
    }
    
    // Nettoyer l'audio quand le modal se ferme
    if (!visible) {
      cleanupStartAudio();
      setStartAudioFinished(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [visible, showResults]);

  // Callback pour la mise à jour du statut de lecture
  const onPlaybackStatusUpdate = useCallback((status) => {
    if (!isMounted.current) return;
    
    if (status.isLoaded) {
      if (status.didJustFinish) {
        cleanupStartAudio();
      }
    } else if (status.error) {
      console.error('Erreur de lecture:', status.error);
    }
  }, []);

  const playStartAudio = useCallback(async () => {
    if (!isMounted.current) return;
    
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
  
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../../assets/audios/Hoeren_start_zweimal.mp3'),
        { 
          shouldPlay: true, 
          isLooping: false,
          volume: 1.0,
        },
        onPlaybackStatusUpdate
      );
  
      if (isMounted.current) {
        startAudioRef.current = newSound;
      } else {
        // Si le composant a été démonté, nettoyer l'audio
        newSound.unloadAsync().catch(console.error);
      }
      
    } catch (error) {
      console.error('Erreur lors de la lecture de l\'audio de démarrage:', error);
    }
  }, [onPlaybackStatusUpdate]);

  // Fonction pour nettoyer l'audio
  const cleanupStartAudio = useCallback(async () => {
    if (startAudioRef.current) {
      try {
        await startAudioRef.current.unloadAsync();
        startAudioRef.current = null;
      } catch (error) {
        console.error('Erreur lors du nettoyage de l\'audio:', error);
      }
    }
  }, []);

  // Cleanup à la destruction du composant
  useEffect(() => {
    return () => {
      cleanupStartAudio();
    };
  }, [cleanupStartAudio]);

  // Vérifier si le modal doit être affiché
  if (!visible || !selectedExercise) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={[styles.container, {marginTop: Platform.OS === "ios" ? 30 : 0}]}>
        <View style={styles.content}>
          {showResults && exerciseResults ? (
            <ResultsView
              selectedUbung={selectedExercise}
              exerciseResults={exerciseResults}
              levelInfo={levelInfo}
              onBack={onClose}
              onRestart={onRestart}
              onNext={hasNextExercise ? onNextExercise : null}
              userNativeLanguage={userNativeLanguage}
            />
          ) : (
            adaptedExercise && (
              <ExerciseView
                selectedUbung={adaptedExercise}
                currentAudioIndex={0}
                selectedAnswers={selectedAnswers}
                levelInfo={levelInfo}
                currentExerciseNumber={currentExerciseNumber}
                totalExercises={totalExercises}
                onBack={onClose}
                onNextAudio={() => {}}
                onPreviousAudio={() => {}}
                onSelectAnswer={onSelectAnswer}
                onFinishExercise={onFinishExercise}
                isStartAudioPlaying={isStartAudioPlaying}
                startAudioFinished={startAudioFinished}
              />
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight || 0, // Pour Android
  },
  content: {
    flex: 1,
  },
});

export default ExerciseModal;