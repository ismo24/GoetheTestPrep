import React, { useState } from 'react';
import { Modal, View, StyleSheet, StatusBar, Platform } from 'react-native';
import ExerciseView from './ExerciseView';
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
  userNativeLanguage = "FR"
}) => {
  if (!visible || !selectedExercise) {
    return null;
  }

  // Trouver l'index de l'exercice actuel pour navigation
  const currentExerciseIndex = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
  const hasNextExercise = currentExerciseIndex < availableExercises.length - 1;

  // Index pour affichage (commence à 1 au lieu de 0)
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
      <View style={[styles.container, { marginTop: Platform.OS == "ios" ? 30 : 0 }]}>
        <View style={styles.content}>
          {/* ✅ MODIFICATION : Plus de distinction showResults, toujours ExerciseView */}
          <ExerciseView
            selectedUbung={selectedExercise}
            currentTextIndex={0}
            selectedAnswers={selectedAnswers}
            exerciseResults={exerciseResults} // ✅ AJOUT
            showResults={showResults} // ✅ AJOUT
            hasNextExercise={hasNextExercise} // ✅ AJOUT
            levelInfo={levelInfo}
            currentExerciseNumber={currentExerciseNumber}
            totalExercises={totalExercises}
            onBack={onClose}
            onNextText={() => {}}
            onPreviousText={() => {}}
            onSelectAnswer={(questionIndex, optionId) => onSelectAnswer(questionIndex, optionId)}
            onFinishExercise={onFinishExercise}
            onRestart={onRestart} // ✅ AJOUT
            onNextExercise={onNextExercise} // ✅ AJOUT
            userNativeLanguage={userNativeLanguage} // ✅ AJOUT
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
    paddingTop: StatusBar.currentHeight || 0, // Pour Android
  },
  content: {
    flex: 1,
  },
});

export default ExerciseModal;