import React from 'react';
import { Modal, View, StyleSheet, StatusBar,Platform } from 'react-native';
import ExerciseView from './ExerciseView';
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

  // Adapter l'exercice pour ExerciseView
  const adaptedExercise = {
    ...selectedExercise,
    data: [{
      Text: selectedExercise.data.Text,
      questions: selectedExercise.data.questions
    }]
  };

  // Trouver l'index de l'exercice actuel pour navigation
  const currentExerciseIndex = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
  const hasNextExercise = currentExerciseIndex < availableExercises.length - 1;

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
            />
          ) : (
            <ExerciseView
              selectedUbung={adaptedExercise}
              currentTextIndex={0}
              selectedAnswers={selectedAnswers}
              levelInfo={levelInfo}
              onBack={onClose}
              onNextText={() => {}}
              onPreviousText={() => {}}
              onSelectAnswer={(questionIndex, optionId) => onSelectAnswer(questionIndex, optionId)}
              onFinishExercise={onFinishExercise}
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