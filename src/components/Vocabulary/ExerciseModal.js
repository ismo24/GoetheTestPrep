import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Modal, View, StyleSheet, StatusBar, Platform } from 'react-native';
import VocabularyView from './VocabularyView';
import { colors } from '../../styles/colors';

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
  onRevealWord,
  actualIndex
}) => {
  // TOUS LES HOOKS DOIVENT ÊTRE APPELÉS AVANT TOUT RETURN
  
  // État pour gérer l'affichage de l'image en plein écran
  const [showFullScreenImg, setShowFullScreenImg] = useState(null);
  
  // Refs stables
  const vocabularyAudioRef = useRef(null);

  // Calculs memoizés des indices d'exercice
  const exerciseData = useMemo(() => {
    if (!availableExercises || actualIndex === undefined) {
      return {
        currentExerciseIndex: 0,
        hasNextExercise: false,
        currentExerciseNumber: 1,
        totalExercises: 1
      };
    }

    return {
      currentExerciseIndex: actualIndex,
      hasNextExercise: actualIndex < availableExercises.length - 1,
      currentExerciseNumber: actualIndex + 1,
      totalExercises: availableExercises.length
    };
  }, [availableExercises, actualIndex]);

  // Fonction pour ouvrir l'image en plein écran
  const handleShowFullScreenImage = useCallback((imageUrl) => {
    setShowFullScreenImg(imageUrl);
  }, []);

  // Fonction pour fermer l'image en plein écran
  const handleCloseFullScreenImage = useCallback(() => {
    setShowFullScreenImg(null);
  }, []);

  // Fonction de fermeture avec nettoyage
  const handleClose = useCallback(() => {
    
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Fonction pour exercice suivant avec nettoyage
  const handleNextExercise = useCallback(() => {
    
    if (onNextExercise) {
      onNextExercise();
    }
  }, [onNextExercise]);

  // Nettoyage à la destruction du composant
  useEffect(() => {
    return () => {

    };
  }, []);

  // Early return APRÈS tous les hooks pour éviter l'erreur "order of hooks"
  if (!visible || !selectedExercise) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={[styles.container, { marginTop: Platform.OS === "ios" ? 30 : 0 }]}>
        <View style={styles.content}>
          <VocabularyView
            vocabularyItem={selectedExercise}
            currentTextIndex={0}
            selectedAnswers={selectedAnswers}
            levelInfo={levelInfo}
            currentExerciseNumber={exerciseData.currentExerciseNumber}
            totalExercises={exerciseData.totalExercises}
            onNext={exerciseData.hasNextExercise ? handleNextExercise : null}
            onBack={handleClose}
            onNextText={() => {}}
            onPreviousText={() => {}}
            onSelectAnswer={(questionIndex, optionId) => onSelectAnswer(questionIndex, optionId)}
            onFinishExercise={onFinishExercise}
            onShowFullScreenImage={handleShowFullScreenImage}
            onRevealWord={onRevealWord}
            levelId={levelInfo?.id}
            actualIndex={actualIndex}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
  },
});

export default ExerciseModal;