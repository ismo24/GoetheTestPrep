import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import ProgressBar from "../common/ProgressBar";

const ExerciseView = ({
  selectedUbung,
  currentTextIndex,
  selectedAnswers,
  currentExerciseNumber,
  totalExercises,
  exerciseResults,
  showResults,
  hasNextExercise,
  levelInfo,
  onBack,
  onNextText,
  onPreviousText,
  onSelectAnswer,
  onFinishExercise,
  onRestart,
  onNextExercise,
}) => {
  const currentText = selectedUbung.data[currentTextIndex];
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [textHeight] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));
  const [isProcessing, setIsProcessing] = useState(false); // AJOUT

  const translations = {
    explanation: {
      DE: "Erklärung:",
      FR: "Explication :",
      EN: "Explanation:",
      // ... autres langues
    },
    buttons: {
      repeat: {
        DE: "Wiederholen",
        FR: "Répéter",
        EN: "Repeat",
        // ... autres langues
      },
      continue: {
        DE: "Weiter",
        FR: "Continuer",
        EN: "Continue",
        // ... autres langues
      },
    },
  };

  const userNativeLanguage = "FR"; // À récupérer depuis les props ou context

  // Fonction pour obtenir le résultat d'une question
  const getQuestionResult = (questionIndex) => {
    if (!showResults || !exerciseResults) return null;
    return exerciseResults.detailedResults[0]?.questions[questionIndex];
  };

  // États pour le timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const intervalRef = useRef(null);

  // Calculer la durée totale du timer (2 minutes par question)
  const totalTimeInSeconds = (currentText.questions?.length || 1) * 2 * 60;

  // Initialiser le timer
  useEffect(() => {
    setTimeLeft(totalTimeInSeconds);
    setIsTimerActive(true);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalTimeInSeconds]);

  // Gérer le décompte du timer
  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !showResults) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1 && !isProcessing) {
            setIsTimerActive(false);
            // Utiliser setTimeout pour éviter l'appel pendant le rendu
            setTimeout(() => {
              onFinishExercise();
            }, 0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timeLeft, onFinishExercise]);

  useEffect(() => {
    if (showResults) {
      setIsProcessing(false);
    }
  }, [showResults]);

  // Fonction pour formater le temps en MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Arrêter le timer quand l'exercice est terminé
  useEffect(() => {
    const allQuestionsAnswered = currentText.questions?.every(
      (_, index) => selectedAnswers[index] !== undefined
    );

    if (allQuestionsAnswered && !showResults && !isProcessing) {
      setIsTimerActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsProcessing(true);
      // Utiliser setTimeout pour éviter l'appel pendant le rendu
      setTimeout(() => {
        onFinishExercise();
      }, 0);
    }
  }, [selectedAnswers, currentText.questions, onFinishExercise]);

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
      }),
    ]).start();
  };

  // Vérifier si toutes les questions ont une réponse
  const allQuestionsAnswered = currentText.questions?.every(
    (_, index) => selectedAnswers[index] !== undefined
  );

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
                outputRange: [50, 1000],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <TouchableOpacity
            onPress={toggleTextVisibility}
            style={
              isTextHidden ? styles.passageHeaderHidden : styles.passageHeader
            }
          >
            <Text style={styles.passageTitle}>Lesetext</Text>
            <View style={styles.eyeButton}>
              <Ionicons
                name={isTextHidden ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.gray}
              />
            </View>
          </TouchableOpacity>

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
            <Text style={styles.passageText}>{currentText.Text}</Text>
          </Animated.View>
        </Animated.View>

        {/* Questions */}
        <View style={styles.questionsSection}>
          {currentText.questions?.map((question, questionIndex) => {
            const isAnswered = selectedAnswers[questionIndex] !== undefined;
            const questionResult = getQuestionResult(questionIndex);

            return (
              <View key={questionIndex} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionTitle}>
                    Frage{" "}
                    {currentText.questions?.length !== 1
                      ? questionIndex + 1
                      : ""}
                  </Text>

                  {/* Affichage conditionnel du badge selon l'état */}
                  {showResults && (
                    // Mode résultats : afficher selon la performance
                    <View
                      style={[
                        styles.answeredBadge,
                        {
                          backgroundColor: questionResult?.isCorrect
                            ? colors.success // Vert si correct
                            : questionResult?.hasAnswer
                            ? "#FF4444" // Rouge si répondu mais incorrect
                            : "black", // Noir si pas de réponse
                        },
                      ]}
                    >
                      <Ionicons
                        name={questionResult?.isCorrect ? "checkmark" : "close"}
                        size={16}
                        color={colors.white}
                      />
                    </View>
                  )}
                </View>

                <Text style={styles.questionText}>{question.title}</Text>

                <View style={styles.optionsContainer}>
                  {question.options?.map((option) => {
                    const isSelected =
                      selectedAnswers[questionIndex] === option.id;
                    const isCorrect = option.isCorrect;

                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.optionButton,
                          isSelected && !showResults && styles.optionSelected,
                        ]}
                        onPress={
                          !showResults
                            ? () => onSelectAnswer(questionIndex, option.id)
                            : null
                        }
                        disabled={showResults}
                      >
                        {/* NOUVELLE LOGIQUE pour les icônes */}
                        {showResults ? (
                          // Mode résultats : afficher les icônes de résultat
                          isCorrect ? (
                            <View
                              style={[
                                styles.correctIndicator,
                                { borderRadius: 10 },
                              ]}
                            >
                              <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={colors.success}
                              />
                            </View>
                          ) : (
                            // Afficher close pour toutes les réponses incorrectes
                            <View
                              style={[
                                styles.incorrectIndicator,
                                { borderRadius: 10 },
                              ]}
                            >
                              <Ionicons
                                name="close-circle"
                                size={20}
                                color={
                                  isSelected ? "#FF4444" : colors.lightGray
                                } // Rouge si sélectionnée, noir sinon
                              />
                            </View>
                          )
                        ) : (
                          // Mode normal : afficher les cercles de sélection
                          <View
                            style={[
                              styles.optionCircle,
                              isSelected && styles.optionCircleSelected,
                            ]}
                          >
                            {isSelected && <View style={styles.optionDot} />}
                          </View>
                        )}

                        <Text
                          style={[
                            styles.optionText,
                            isSelected &&
                              !showResults &&
                              styles.optionTextSelected,
                          ]}
                        >
                          ({option.id.toUpperCase()}) {option.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* NOUVELLE SECTION : Explication après les résultats */}
                {showResults && questionResult?.explanation && (
                  <View style={styles.explanationBox}>
                    <View style={styles.explanationHeader}>
                      <Ionicons
                        name="bulb-outline"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.explanationTitle}>
                        {translations.explanation[userNativeLanguage]}
                      </Text>
                    </View>

                    <Text style={styles.explanationText}>
                      {questionResult.explanation}
                    </Text>

                    {userNativeLanguage !== "DE" &&
                      questionResult.nativeExplanation && (
                        <View style={styles.nativeExplanationContainer}>
                          <View style={styles.nativeExplanationSeparator} />
                          <Text style={styles.nativeExplanationText}>
                            {questionResult.nativeExplanation}
                          </Text>
                        </View>
                      )}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Statut de progression */}
        {!showResults && (
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {Object.keys(selectedAnswers).length} von{" "}
              {currentText.questions?.length || 0} Fragen beantwortet
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Timer Container - Mise à jour avec le timer fonctionnel */}
      {!showResults && (
        <View
          style={[
            styles.timerContainer,
            { backgroundColor: timeLeft <= 60 ? "#FF4444" : colors.primary },
          ]}
        >
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      )}

      {/* Bouton sticky "Beenden" */}
      {showResults ? (
        <View style={styles.resultsButtonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.restartButton]}
            onPress={onRestart}
          >
            <Text style={styles.restartButtonText}>
              {translations.buttons.repeat[userNativeLanguage]}
            </Text>
          </TouchableOpacity>

          {hasNextExercise ? (
            <TouchableOpacity
              style={[styles.actionButton, styles.restartButton]}
              onPress={onNextExercise}
            >
              <Text style={styles.restartButtonText}>
                {translations.buttons.continue[userNativeLanguage]}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={onBack}
            >
              <Text style={styles.actionButtonText}>Exercices</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        /* Bouton BEENDEN existant */
        <View
          style={[
            styles.stickyButtonContainer,
            { opacity: allQuestionsAnswered ? 1 : 0 },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.stickyButton,
              {
                backgroundColor: allQuestionsAnswered
                  ? colors.primary
                  : colors.gray,
                opacity: allQuestionsAnswered ? 1 : 0,
              },
            ]}
            onPress={onFinishExercise}
            disabled={!allQuestionsAnswered}
          >
            <Text style={styles.stickyButtonText}>
              {allQuestionsAnswered ? "BEENDEN" : "ALLE FRAGEN BEANTWORTEN"}
            </Text>
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

// Les styles restent identiques - pas de modifications nécessaires
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    marginTop:Platform.OS=="ios"?20:0
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6D6DB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exerciseCounter: {
    paddingHorizontal: 16,
    marginLeft: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 250,
    maxWidth: 300,
  },
  exerciseCounterText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  exerciseContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  readingPassage: {
    backgroundColor: colors.white,
    margin: 16,
    marginBottom: 16,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 5,
  },
  passageHeaderHidden: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  passageTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginBottom: 8,
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
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  answeredBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  optionSelected: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionCircleSelected: {
    borderColor: "white",
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: "white",
    fontWeight: "500",
  },
  progressInfo: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: "500",
  },
  timerContainer: {
    position: "absolute",
    bottom: "4%",
    left: 80,
    right: 80,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "800",
  },
  stickyButtonContainer: {
    position: "absolute",
    bottom: "8%",
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stickyButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  stickyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  // Nouveaux styles à ajouter
  correctIndicator: {
    marginRight: 12,
    width: 24, // AJOUT
    height: 24, // AJOUT
    justifyContent: "center", // AJOUT
    alignItems: "center",
  },
  incorrectIndicator: {
    marginRight: 12,
    width: 24, // AJOUT
    height: 24, // AJOUT
    justifyContent: "center", // AJOUT
    alignItems: "center", // AJOUT
  },

  explanationBox: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  explanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  nativeExplanationContainer: {
    marginTop: 12,
    paddingTop: 12,
  },
  nativeExplanationSeparator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 12,
    opacity: 0.5,
  },
  nativeExplanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontStyle: "italic",
    opacity: 0.8,
  },
  resultsButtonContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor:"white",
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restartButton: {
    backgroundColor: colors.lightGray,
  },
  restartButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExerciseView;
