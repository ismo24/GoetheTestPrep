import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import ProgressBar from "../common/ProgressBar";
import AudioPlayer from "./AudioPlayer";

const ExerciseView = ({
  selectedUbung,
  currentAudioIndex,
  selectedAnswers,
  exerciseResults,
  showResults,
  hasNextExercise,
  levelInfo,
  currentExerciseNumber,
  totalExercises,
  onBack,
  onNextAudio,
  onPreviousAudio,
  onSelectAnswer,
  onFinishExercise,
  onRestart,
  onNextExercise,
  isStartAudioPlaying = false,
  startAudioFinished = false,
  userNativeLanguage = "FR",
  onRestartAudioSequence,
}) => {
  const [audioStarted, setAudioStarted] = useState(false);
  const hasFinishedExercise = useRef(false);
  const audioPlayerRef = useRef(null);
  const [audioKey, setAudioKey] = useState(0);

  const translations = {
    explanation: {
      DE: "Erklärung:",
      FR: "Explication :",
      EN: "Explanation:",
    },
    buttons: {
      repeat: {
        DE: "Wiederholen",
        FR: "Répéter",
        EN: "Repeat",
      },
      continue: {
        DE: "Weiter",
        FR: "Continuer",
        EN: "Continue",
      },
    },
  };

  // Memoiser les données pour éviter les re-calculs
  const currentAudio = useMemo(() => {
    return selectedUbung?.data?.[currentAudioIndex];
  }, [selectedUbung, currentAudioIndex]);

  // ✅ CORRECTION : Memoiser avec une clé stable
  const allQuestionsAnswered = useMemo(() => {
    if (!currentAudio?.questions) return false;
    return currentAudio.questions.every(
      (_, index) => selectedAnswers[index] !== undefined
    );
  }, [currentAudio?.questions, selectedAnswers]);

  // ✅ CORRECTION : Fonction pour obtenir le résultat d'une question
  const getQuestionResult = useCallback((questionIndex) => {
    if (!showResults || !exerciseResults) return null;
    
    // Vérifier plusieurs structures possibles
    const result = exerciseResults.detailedResults?.[0]?.questions?.[questionIndex] || 
                   exerciseResults.questions?.[questionIndex] ||
                   exerciseResults[questionIndex];
    
    return result;
  }, [showResults, exerciseResults]);

  // ✅ NOUVELLE FONCTION : Vérifier si une question a été répondue
  const hasUserAnswered = useCallback((questionIndex) => {
    if (!showResults) {
      // Mode normal : vérifier dans selectedAnswers
      return selectedAnswers[questionIndex] !== undefined;
    }
    
    // Mode résultats : vérifier si l'utilisateur a donné une réponse
    const questionResult = getQuestionResult(questionIndex);
    const hasSelectedAnswer = selectedAnswers[questionIndex] !== undefined;
    
    return questionResult && (
      questionResult.hasAnswer === true ||
      questionResult.userAnswer !== undefined ||
      questionResult.userAnswer !== null ||
      hasSelectedAnswer
    );
  }, [showResults, selectedAnswers, getQuestionResult]);

  // ✅ FONCTION : Déterminer la couleur du badge
  const getBadgeColor = useCallback((questionIndex) => {
    const questionResult = getQuestionResult(questionIndex);
    const userAnswered = hasUserAnswered(questionIndex);
    
    if (questionResult?.isCorrect) {
      return colors.success; // Vert pour correct
    } else if (userAnswered) {
      return "#FF4444"; // Rouge pour incorrect mais répondu  
    } else {
      return "black"; // Noir pour pas de réponse
    }
  }, [getQuestionResult, hasUserAnswered]);

  // ✅ NOUVEAU : Fonction pour arrêter les audios
  const stopAllAudio = useCallback(async () => {
    if (audioPlayerRef.current) {
      try {
        await audioPlayerRef.current.stopAudio();
        console.log("🔇 Audio arrêté automatiquement");
      } catch (error) {
        console.error("Erreur lors de l'arrêt de l'audio:", error);
      }
    }
  }, []);

  // ✅ NOUVEAU : Fonction pour réinitialiser complètement l'audio
  const resetAudioSequence = useCallback(async () => {
    console.log("🔄 Reset complet de la séquence audio");
    
    // 1. Arrêter l'audio actuel
    await stopAllAudio();
    
    // 2. Reset des états locaux
    setAudioStarted(false);
    hasFinishedExercise.current = false;
    
    // 3. Forcer le re-rendu de l'AudioPlayer avec une nouvelle clé
    setAudioKey(prev => prev + 1);
    
    // 4. Déclencher le callback parent pour relancer l'audio initial
    if (onRestartAudioSequence) {
      onRestartAudioSequence();
    }
    
    console.log("✅ Séquence audio réinitialisée");
  }, [stopAllAudio, onRestartAudioSequence]);

  // ✅ NOUVEAU : Arrêter l'audio quand showResults devient true
  useEffect(() => {
    if (showResults) {
      console.log("📊 Passage en mode résultats - Arrêt de l'audio");
      stopAllAudio();
    }
  }, [showResults, stopAllAudio]);

  // ✅ NOUVEAU : Wrappers pour arrêter l'audio avant navigation
  const handleBack = useCallback(async () => {
    console.log("⬅️ Retour - Arrêt de l'audio");
    await stopAllAudio();
    if (onBack) onBack();
  }, [onBack, stopAllAudio]);

  // ✅ MODIFIÉ : Wrapper pour redémarrer avec reset complet
  const handleRestart = useCallback(async () => {
    console.log("🔄 Redémarrage complet avec reset audio");
    await resetAudioSequence();
  }, [resetAudioSequence]);

  const handleNextExercise = useCallback(async () => {
    console.log("➡️ Exercice suivant - Arrêt de l'audio");
    await stopAllAudio();
    if (onNextExercise) onNextExercise();
  }, [onNextExercise, stopAllAudio]);

  // ✅ CORRECTION : Fonction stable pour finir l'exercice
  const stableOnFinishExercise = useCallback(() => {
    // Protection contre les appels multiples
    if (hasFinishedExercise.current || showResults) {
      return;
    }
    
    hasFinishedExercise.current = true;
    console.log("🔥 Appel de onFinishExercise - UNE SEULE FOIS");
    
    if (onFinishExercise) {
      onFinishExercise();
    }
  }, [onFinishExercise, showResults]);

  // ✅ CORRECTION : Effet simplifié et stable
  useEffect(() => {
    // Reset du flag quand on change d'exercice ou qu'on recommence
    if (!showResults) {
      hasFinishedExercise.current = false;
    }
  }, [showResults, currentAudioIndex]);

  // ✅ CORRECTION : Un seul effet pour gérer la fin d'exercice
  useEffect(() => {
    if (
      allQuestionsAnswered && 
      !showResults && 
      !hasFinishedExercise.current
    ) {
      // Petit délai pour éviter les appels simultanés
      const timer = setTimeout(() => {
        stableOnFinishExercise();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [allQuestionsAnswered, showResults, stableOnFinishExercise]);

  // Reset audio state when changing audio
  useEffect(() => {
    setAudioStarted(false);
  }, [currentAudioIndex]);

  const handleAudioFinished = useCallback(() => {
    setAudioStarted(true);
  }, []);

  const showQuestionsManually = useCallback(() => {
    setAudioStarted(true);
  }, []);

  // ✅ NOUVEAU : Cleanup à la destruction du composant
  useEffect(() => {
    return () => {
      console.log("🧹 Nettoyage du composant ExerciseView - Arrêt de l'audio");
      stopAllAudio();
    };
  }, [stopAllAudio]);

  // Vérifier si currentAudio existe avant le rendu
  if (!currentAudio) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement de l'exercice...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
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
        <TouchableOpacity>
          {/* Espace pour équilibrer le header */}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.exerciseContent}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Lecteur Audio */}
        <View style={styles.audioSection}>
          <AudioPlayer
            ref={audioPlayerRef}
            key={`${currentAudio.audio_url}-${audioKey}`}
            audio_url={currentAudio.audio_url}
            onAudioFinished={handleAudioFinished}
            autoPlay={startAudioFinished}
            countdown={10}
          />
        </View>

        {/* Questions */}
        <View style={styles.questionsSection}>
          {currentAudio.questions?.map((question, questionIndex) => {
            const isAnswered = selectedAnswers[questionIndex] !== undefined;
            const questionResult = getQuestionResult(questionIndex);
            
            return (
              <View key={`${question.id || questionIndex}`} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionTitle}>
                    Frage {currentAudio.questions?.length !== 1 ? questionIndex + 1 : ""}
                  </Text>
                  
                  {/* ✅ CORRECTION PRINCIPALE : Badge avec logique améliorée */}
                  {showResults ? (
                    <View style={[
                      styles.answeredBadge,
                      { backgroundColor: getBadgeColor(questionIndex) }
                    ]}>
                      <Ionicons
                        name={questionResult?.isCorrect ? "checkmark" : "close"}
                        size={16}
                        color={colors.white}
                      />
                    </View>
                  ) : (
                    isAnswered && (
                      <View style={styles.answeredBadge}>
                        <Ionicons name="checkmark" size={16} color={colors.white} />
                      </View>
                    )
                  )}
                </View>
                
                <Text style={styles.questionText}>
                  {question.title}
                </Text>
                
                <View style={styles.optionsContainer}>
                  {question.options?.map((option) => {
                    const isSelected = selectedAnswers[questionIndex] === option.id;
                    const isCorrect = option.isCorrect;
                    
                    return (
                      <TouchableOpacity
                        key={`${option.id}-${questionIndex}`}
                        style={[
                          styles.optionButton,
                          isSelected && !showResults && styles.optionSelected
                        ]}
                        onPress={!showResults ? () => onSelectAnswer(questionIndex, option.id) : null}
                        disabled={showResults}
                      >
                        {showResults ? (
                          isCorrect ? (
                            <View style={[styles.correctIndicator, { borderRadius: 10 }]}>
                              <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={colors.success}
                              />
                            </View>
                          ) : (
                            <View style={[styles.incorrectIndicator, { borderRadius: 10 }]}>
                              <Ionicons
                                name="close-circle"
                                size={20}
                                color={isSelected ? "#FF4444" : colors.lightGray}
                              />
                            </View>
                          )
                        ) : (
                          <View style={[
                            styles.optionCircle,
                            isSelected && styles.optionCircleSelected
                          ]}>
                            {isSelected && (
                              <View style={styles.optionDot} />
                            )}
                          </View>
                        )}
                        
                        <Text style={[
                          styles.optionText,
                          isSelected && !showResults && styles.optionTextSelected
                        ]}>
                          ({option.id.toUpperCase()}) {option.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Explication après les résultats */}
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
                    
                    {userNativeLanguage !== "DE" && questionResult.nativeExplanation && (
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
              {Object.keys(selectedAnswers).length} von {currentAudio.questions?.length || 0} Fragen beantwortet
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Boutons selon le mode */}
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
              onPress={handleBack}
            >
              <Text style={styles.actionButtonText}>Exercices</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={[styles.stickyButtonContainer, {opacity: allQuestionsAnswered ? 1 : 0}]}>
          <TouchableOpacity 
            style={[
              styles.stickyButton, 
              { 
                backgroundColor: allQuestionsAnswered ? colors.primary : colors.gray,
                opacity: allQuestionsAnswered ? 1 : 0
              }
            ]}
            onPress={stableOnFinishExercise}
            disabled={!allQuestionsAnswered}
          >
            <Text style={styles.stickyButtonText}>
              {allQuestionsAnswered ? 'BEENDEN' : 'ALLE FRAGEN BEANTWORTEN'}
            </Text>
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

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
    backgroundColor: colors.background,
  },
  audioSection: {
    margin: 16,
    marginBottom: 8,
  },
  instructionBox: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  instructionContent: {
    alignItems: "center",
  },
  instructionText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    marginVertical: 12,
    lineHeight: 20,
  },
  skipButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  questionsSection: {
    marginHorizontal: 16,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
  },
  correctIndicator: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  incorrectIndicator: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
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