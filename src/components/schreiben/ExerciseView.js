import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import ImageWrapper from './ImageWrapper';
import ProgressBar from '../common/ProgressBar';

const ExerciseView = ({
  selectedUbung,
  currentTextIndex,
  selectedAnswers,
  levelInfo,
  currentExerciseNumber,
  totalExercises,
  onBack,
  onNextText,
  onPreviousText,
  onSelectAnswer,
  onFinishExercise,
  onShowFullScreenImage
}) => {
  const currentText = selectedUbung.data || selectedUbung;
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [textHeight] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return false;
    }
    
    const trimmedUrl = url.trim();
    return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
  };

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
  const allQuestionsAnswered = (currentText.questions || selectedUbung.data?.questions)?.every((_, index) => 
    selectedAnswers[index] !== undefined
  );



  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
        <View style={styles.exerciseCounter}>
            <ProgressBar 
              currentIndex={currentExerciseNumber || 1}
              totalCount={totalExercises || 1}
              height={8}
              backgroundColor="#E5E5E5"
              progressColor={colors.primary}
            />
          </View>
        </View>
        {/* <TouchableOpacity style={{ opacity: 0 }}>
          <Text style={styles.exerciseCounterText}>yes</Text>
        </TouchableOpacity> */}
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
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <View style={styles.passageHeader}>
            <Text style={styles.passageTitle}>Aufgabe</Text>
            <TouchableOpacity
              onPress={toggleTextVisibility}
              style={styles.eyeButton}
            >
              <Ionicons
                name={isTextHidden ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>

          

          <Animated.View
            style={{
              opacity: opacity,
              transform: [
                {
                  scaleY: textHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <View style={styles.separatorLine} />
           {Array.isArray(currentText.Text) ? (
  currentText.Text.map((value, index) => (
    <Text key={index} style={styles.passageText}>
      {value}
    </Text>
  ))
) : (
  <Text style={styles.passageText}>{currentText.Text}</Text>
)}

          </Animated.View>
        </Animated.View>

        {(selectedUbung.questionType === "graphik_description" || 
          selectedUbung.questionType === "karikatur_description") && 
          isValidImageUrl(selectedUbung.image_url) && (
          <ImageWrapper 
            imageUrl={selectedUbung.image_url} 
            questionType={selectedUbung.questionType}
            onImagePress={onShowFullScreenImage}
          />
        )}

   {/* Partie montrant les formulaires s'il s'agit d'un formulaire */}
{/* Partie montrant les formulaires s'il s'agit d'un formulaire */}
{selectedUbung.questionType == "formular" ? (
  <View style={styles.questionsSection}>
    <View style={styles.questionCard}>
      
      
      <View style={styles.formularContainer}>
        {Object.entries(selectedUbung.formular_grid).map(([key, value]) => {
          const [predefinedValue, characterCount] = value;
          const displayValue = predefinedValue || "_".repeat(characterCount);
          
          // Formatage du label : exactement 10 caractères ou garder tel quel si plus long
          const formattedLabel = key.length <= 10 
            ? `${key}:`.padEnd(10, ' ') 
            : `${key}: `;
          
          return (
            <Text key={key} style={styles.formularRow}>
              <Text style={styles.formularLabel}>
                {formattedLabel}
              </Text>
              <Text style={styles.formularField}>
                {displayValue}
              </Text>
            </Text>
          );
        })}
      </View>
    </View>
  </View>
) : null}

        {/* Questions */}
        <View style={styles.questionsSection}>
          {/* return ( */}
          <View style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionTitle}>Tipps</Text>
            </View>

            <View style={styles.optionsContainer}>
            {(currentText.Tipps || selectedUbung.data?.Tipps)?.map((Tipp, TippIndex) => {
                return (
                  <View
                    key={currentText.Tipps.indexOf(Tipp)}
                    style={[styles.optionButton]}
                  >
                    <View style={[styles.optionCircle]}>
                      {<View style={styles.optionDot} />}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        // isSelected && styles.optionTextSelected
                      ]}
                    >
                      {Tipp}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          {/* );
          // })} */}
        </View>

        {/* Statut de progression */}
        {/* <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {Object.keys(selectedAnswers).length} von {currentText.questions?.length || 0} Fragen beantwortet
          </Text>
        </View> */}
      </ScrollView>

      {/* Bouton sticky "Beenden" */}
      <View style={[styles.stickyButtonContainer]}>
        <TouchableOpacity
          style={[
            styles.stickyButton,
            {
              backgroundColor: colors.success,
            },
          ]}
          onPress={onFinishExercise}
          // disabled={!allQuestionsAnswered}
        >
          <Text style={styles.stickyButtonText}>BEISPIEL SEHEN</Text>
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
    flex: 1,
    backgroundColor: colors.background,
  },
  readingPassage: {
    backgroundColor: colors.white,
    margin: 16,
    marginBottom: 16,
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
    // borderWidth: 2,
    // borderColor: colors.gray,
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
    // backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // borderTopWidth: 1,
    // borderTopColor: colors.lightGray,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 8,
  },
  stickyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginHorizontal:30,
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
  formularContainer: {
    gap: 12,
  },
  formularRow: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    paddingVertical: 4,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  formularLabel: {
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'monospace', // Important pour l'alignement des espaces
  },
  formularField: {
    fontFamily: 'monospace', // Pour un alignement uniforme des traits
    color: colors.text,
  },

});

export default ExerciseView;