import React, { useState } from 'react';
import { Modal, View, StyleSheet, StatusBar, Platform } from 'react-native';
import VocabularyView from './VocabularyView';
import ResultsView from './ResultsView';
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
}) => {
  if (!visible || !selectedExercise) {
    return null;
  }

  // Trouver l'index de l'exercice actuel pour navigation
  const currentExerciseIndex = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
  const hasNextExercise = currentExerciseIndex < availableExercises.length - 1;
  
  // État pour gérer l'affichage de l'image en plein écran
  const [showFullScreenImg, setShowFullScreenImg] = useState(null);

  // Fonction pour ouvrir l'image en plein écran
  const handleShowFullScreenImage = (imageUrl) => {
    setShowFullScreenImg(imageUrl);
  };

  // Fonction pour fermer l'image en plein écran
  const handleCloseFullScreenImage = () => {
    setShowFullScreenImg(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={[styles.container, { marginTop: Platform.OS == "ios" ? 30 : 0 }]}>
        <View style={styles.content}>
          {showResults ? (
            <ResultsView
              selectedUbung={selectedExercise}
              levelInfo={levelInfo}
              onBack={onClose}
              onRestart={onRestart}
              onNext={hasNextExercise ? onNextExercise : null}
            />
          ) : (
            <VocabularyView
            vocabularyItem={selectedExercise}
              currentTextIndex={0}
              selectedAnswers={selectedAnswers}
              levelInfo={levelInfo}
              onNext={hasNextExercise ? onNextExercise : null}
              onBack={onClose}
              onNextText={() => {}}
              onPreviousText={() => {}}
              onSelectAnswer={(questionIndex, optionId) => onSelectAnswer(questionIndex, optionId)}
              onFinishExercise={onFinishExercise}
              onShowFullScreenImage={handleShowFullScreenImage} // Nouvelle prop
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