import React, { useState, useEffect, useRef } from 'react';
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
  if (!visible || !selectedExercise) {
    return null;
  }

  // Adapter l'exercice pour ExerciseView
  const adaptedExercise = {
    ...selectedExercise,
    data: [{
      audioUrl: selectedExercise.data.audioUrl,
      questions: selectedExercise.data.questions
    }]
  };

  const [isStartAudioPlaying, setIsStartAudioPlaying] = useState(false);
  const [startAudioFinished, setStartAudioFinished] = useState(false);
  const startAudioRef = useRef(null);

  useEffect(() => {
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
  }, [visible, showResults]);


  const playStartAudio = async () => {
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
  
      startAudioRef.current = newSound;
      
    } catch (error) {
      console.error('Erreur lors de la lecture de l\'audio de démarrage:', error);
    }
  };
  
  // Ajouter cette fonction callback
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        cleanupStartAudio();
      }
    } else if (status.error) {
      console.error('Erreur de lecture:', status.error);
    }
  };
  

  // Fonction pour nettoyer l'audio
  const cleanupStartAudio = async () => {
    if (startAudioRef.current) {
      try {
        await startAudioRef.current.unloadAsync();
        startAudioRef.current = null;
      } catch (error) {
        console.error('Erreur lors du nettoyage de l\'audio:', error);
      }
    }
  };
  

  // Trouver l'index de l'exercice actuel pour navigation
  const currentExerciseIndex = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
  const hasNextExercise = currentExerciseIndex < availableExercises.length - 1;

  // AJOUT : Index pour affichage (commence à 1 au lieu de 0)
  const currentExerciseNumber = currentExerciseIndex + 1;
  const totalExercises = availableExercises.length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      {/* <StatusBar backgroundColor={colors.background} barStyle="dark-content" /> */}
      <View style={[styles.container,{marginTop:Platform.OS=="ios"?30:0}]}>
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
              onSelectAnswer={(questionIndex, optionId) => onSelectAnswer(questionIndex, optionId)}
              onFinishExercise={onFinishExercise}
              isStartAudioPlaying={isStartAudioPlaying}
              startAudioFinished={startAudioFinished}
            />
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