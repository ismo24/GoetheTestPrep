import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const ExerciseView = ({
  selectedUbung,
  currentTextIndex,
  selectedAnswers,
  levelInfo,
  onBack,
  onNextText,
  onPreviousText,
  onSelectAnswer,
  onFinishExercise
}) => {
  const currentText = selectedUbung.data[currentTextIndex];
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [textHeight] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  const toggleTextVisibility = () => {
    const newHiddenState = !isTextHidden;
    setIsTextHidden(newHiddenState);

    Animated.parallel([
      Animated.timing(textHeight, {
        toValue: newHiddenState ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: newHiddenState ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      })
    ]).start();
  };

  // Vérifier si toutes les questions ont une réponse
  const allQuestionsAnswered = currentText.questions?.every((_, index) => 
    selectedAnswers[index] !== undefined
  );

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={[styles.exerciseCounter, { backgroundColor: levelInfo.color }]}>
            <Text style={styles.exerciseCounterText}>
              {selectedUbung.title}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          {/* Espace pour équilibrer le header */}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.exerciseContent}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Passage de lecture */}
        <Animated.View 
          style={[
            styles.readingPassage,
            {
              maxHeight: textHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [80, 1000],
                extrapolate: 'clamp',
              }),
            }
          ]}
        >
          <View style={styles.passageHeader}>
            <Text style={styles.passageTitle}>Lesetext</Text>
            <TouchableOpacity onPress={toggleTextVisibility} style={styles.eyeButton}>
              <Ionicons 
                name={isTextHidden ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color={colors.gray} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.separatorLine} />
          
          <Animated.View
            style={{
              opacity: opacity,
              transform: [{
                scaleY: textHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                })
              }],
            }}
          >
            <Text style={styles.passageText}>
              {currentText.Text}
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Questions */}
        <View style={styles.questionsSection}>
          <Text style={styles.questionsSectionTitle}>
            Fragen ({currentText.questions?.length || 0})
          </Text>
          
          {currentText.questions?.map((question, questionIndex) => {
            const isAnswered = selectedAnswers[questionIndex] !== undefined;
            
            return (
              <View key={questionIndex} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionTitle}>
                    Frage {questionIndex + 1}
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
                        key={option.id}
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
            {Object.keys(selectedAnswers).length} von {currentText.questions?.length || 0} Fragen beantwortet
          </Text>
        </View>
      </ScrollView>

      {/* Bouton sticky "Beenden" */}
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.stickyButton, 
            { 
              backgroundColor: allQuestionsAnswered ? levelInfo.color : colors.gray,
              opacity: allQuestionsAnswered ? 1 : 0.6 
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exerciseCounter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exerciseCounterText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  exerciseContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  readingPassage: {
    backgroundColor: colors.white,
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  passageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  passageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  eyeButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  separatorLine: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 16,
  },
  passageText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 16,
  },
  questionsSection: {
    marginHorizontal: 16,
  },
  questionsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
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
    backgroundColor: colors.success,
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
    backgroundColor: colors.secondary + '15',
    borderWidth: 1,
    borderColor: colors.secondary,
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
    borderColor: colors.secondary,
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.secondary,
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
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  stickyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
  },
  stickyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseView;