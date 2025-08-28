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
  onRevealWord,
  actualIndex
}) => {
  if (!visible || !selectedExercise) {
    return null;
  }

  // Trouver l'index de l'exercice actuel pour navigation
  const currentExerciseIndex = actualIndex;
  const hasNextExercise = currentExerciseIndex < availableExercises.length  - 1;

  // Index pour affichage (commence à 1 au lieu de 0)
  const currentExerciseNumber = currentExerciseIndex  + 1;
  const totalExercises = availableExercises.length;
       
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
          {/* {showResults ? (
            <ResultsView
              selectedUbung={selectedExercise}
              levelInfo={levelInfo}
              onBack={onClose}
              onRestart={onRestart}
              onNext={hasNextExercise ? onNextExercise : null}
            />
          ) : ( */}
            <VocabularyView
              vocabularyItem={selectedExercise}
              currentTextIndex={0}
              selectedAnswers={selectedAnswers}
              levelInfo={levelInfo}
              currentExerciseNumber={currentExerciseNumber}
              totalExercises={totalExercises}
              onNext={hasNextExercise ? onNextExercise : null}
              onBack={onClose}
              onNextText={() => {}}
              onPreviousText={() => {}}
              onSelectAnswer={(questionIndex, optionId) => onSelectAnswer(questionIndex, optionId)}
              onFinishExercise={onFinishExercise}
              onShowFullScreenImage={handleShowFullScreenImage}
              onRevealWord={onRevealWord} // NOUVEAU: Passer le callback
              levelId={levelInfo?.id} // NOUVEAU: Passer l'ID du niveau
              actualIndex={actualIndex}
            />
          {/* )} */}
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