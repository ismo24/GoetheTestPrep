import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const ResultsView = ({ selectedUbung, exerciseResults, levelInfo, onBack, onRestart }) => {
  // Fonction pour obtenir un message de félicitation basé sur le score
  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "Hervorragend gehört!";
    if (percentage >= 75) return "Sehr gut verstanden!";
    if (percentage >= 60) return "Gut zugehört!";
    if (percentage >= 50) return "Nicht schlecht!";
    return "Mehr üben!";
  };

  // Fonction pour obtenir l'icône basée sur le score
  const getScoreIcon = (percentage) => {
    if (percentage >= 90) return "trophy";
    if (percentage >= 75) return "medal";
    if (percentage >= 60) return "thumbs-up";
    if (percentage >= 50) return "checkmark-circle";
    return "refresh-circle";
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Ergebnisse - {selectedUbung.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.resultsContent} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Score principal */}
        <View style={[styles.scoreCard, { backgroundColor: levelInfo.color }]}>
          <View style={styles.scoreHeader}>
            <Ionicons name={getScoreIcon(exerciseResults.percentage)} size={32} color={colors.white} />
            <Text style={styles.scoreTitle}>{getScoreMessage(exerciseResults.percentage)}</Text>
          </View>
          <Text style={styles.scorePercentage}>{exerciseResults.percentage}%</Text>
          <Text style={styles.scoreDetails}>
            {exerciseResults.correctAnswers} von {exerciseResults.totalQuestions} Fragen richtig
          </Text>
          
          {/* Indicateur de performance */}
          <View style={styles.performanceIndicator}>
            {exerciseResults.percentage >= 70 ? (
              <View style={styles.passedIndicator}>
                <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                <Text style={styles.performanceText}>Bestanden!</Text>
              </View>
            ) : (
              <View style={styles.failedIndicator}>
                <Ionicons name="close-circle" size={20} color={colors.white} />
                <Text style={styles.performanceText}>Nicht bestanden</Text>
              </View>
            )}
          </View>
        </View>

        {/* Résumé rapide */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Zusammenfassung</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.success }]}>
                <Ionicons name="checkmark" size={16} color={colors.white} />
              </View>
              <Text style={styles.statLabel}>Richtig</Text>
              <Text style={styles.statValue}>{exerciseResults.correctAnswers}</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.error }]}>
                <Ionicons name="close" size={16} color={colors.white} />
              </View>
              <Text style={styles.statLabel}>Falsch</Text>
              <Text style={styles.statValue}>{exerciseResults.wrongAnswers}</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="headset" size={16} color={colors.white} />
              </View>
              <Text style={styles.statLabel}>Audio gehört</Text>
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
        </View>

        {/* Détails par question */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Detaillierte Auswertung</Text>
          
          {exerciseResults.detailedResults[0].questions.map((questionResult, qIndex) => (
            <View key={qIndex} style={styles.questionResult}>
              <View style={styles.questionResultHeader}>
                <Text style={styles.questionResultTitle}>
                  Frage {questionResult.questionIndex}
                </Text>
                <View style={[
                  styles.resultBadge,
                  { backgroundColor: questionResult.isCorrect ? colors.success : colors.error }
                ]}>
                  <Ionicons 
                    name={questionResult.isCorrect ? "checkmark" : "close"} 
                    size={16} 
                    color={colors.white} 
                  />
                </View>
              </View>
              
              <Text style={styles.questionText}>{questionResult.questionText}</Text>
              
              <View style={styles.answersComparison}>
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Ihre Antwort:</Text>
                  <Text style={[
                    styles.answerText,
                    { color: questionResult.isCorrect ? colors.success : colors.error }
                  ]}>
                    {questionResult.selectedAnswer}
                  </Text>
                </View>
                
                {!questionResult.isCorrect && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Richtige Antwort:</Text>
                    <Text style={[styles.answerText, { color: colors.success }]}>
                      {questionResult.correctAnswer}
                    </Text>
                  </View>
                )}
              </View>

              {questionResult.explanation && (
                <View style={styles.explanationBox}>
                  <View style={styles.explanationHeader}>
                    <Ionicons name="bulb-outline" size={16} color={colors.primary} />
                    <Text style={styles.explanationTitle}>Erklärung:</Text>
                  </View>
                  <Text style={styles.explanationText}>
                    {questionResult.explanation}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Conseils d'amélioration spécifiques au Hören */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Tipps zur Verbesserung</Text>
          
          {exerciseResults.percentage < 60 && (
            <>
              <View style={styles.tipItem}>
                <Ionicons name="volume-high" size={16} color={colors.warning} />
                <Text style={styles.tipText}>Hören Sie das Audio mehrmals an</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="eye" size={16} color={colors.warning} />
                <Text style={styles.tipText}>Konzentrieren Sie sich auf Schlüsselwörter</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="time" size={16} color={colors.warning} />
                <Text style={styles.tipText}>Pausieren Sie zwischen den Fragen</Text>
              </View>
            </>
          )}
          
          {exerciseResults.percentage >= 60 && exerciseResults.percentage < 80 && (
            <>
              <View style={styles.tipItem}>
                <Ionicons name="trending-up" size={16} color={colors.primary} />
                <Text style={styles.tipText}>Üben Sie regelmäßig mit verschiedenen Audioquellen</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="book" size={16} color={colors.primary} />
                <Text style={styles.tipText}>Erweitern Sie Ihren Wortschatz</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="musical-notes" size={16} color={colors.primary} />
                <Text style={styles.tipText}>Achten Sie auf Intonation und Betonung</Text>
              </View>
            </>
          )}
          
          {exerciseResults.percentage >= 80 && (
            <>
              <View style={styles.tipItem}>
                <Ionicons name="trophy" size={16} color={colors.success} />
                <Text style={styles.tipText}>Ausgezeichnet! Versuchen Sie das nächste Niveau.</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="globe" size={16} color={colors.success} />
                <Text style={styles.tipText}>Hören Sie authentische deutsche Medien</Text>
              </View>
            </>
          )}
        </View>

        {/* Conseils généraux pour l'écoute */}
        <View style={styles.generalTipsSection}>
          <Text style={styles.generalTipsTitle}>Allgemeine Hörtipps</Text>
          <View style={styles.tipItem}>
            <Ionicons name="headset" size={16} color={colors.primary} />
            <Text style={styles.tipText}>Verwenden Sie Kopfhörer für bessere Qualität</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="person" size={16} color={colors.primary} />
            <Text style={styles.tipText}>Hören Sie verschiedene Sprecher und Dialekte</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="repeat" size={16} color={colors.primary} />
            <Text style={styles.tipText}>Wiederholen Sie schwierige Passagen</Text>
          </View>
        </View>
      </ScrollView>

      {/* Boutons d'action sticky */}
      <View style={styles.stickyButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.restartButton]} 
          onPress={onRestart}
        >
          <Ionicons name="refresh" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Wiederholen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: levelInfo.color }]} 
          onPress={onBack}
        >
          <Ionicons name="list" size={20} color={colors.white} />
          <Text style={styles.actionButtonText}>Übungen</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  resultsContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scoreCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  scorePercentage: {
    color: colors.white,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreDetails: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 12,
  },
  performanceIndicator: {
    marginTop: 8,
  },
  passedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  failedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performanceText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: colors.white,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  detailsSection: {
    margin: 16,
    marginTop: 0,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  questionResult: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  resultBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  answersComparison: {
    marginTop: 8,
    marginBottom: 12,
  },
  answerRow: {
    marginBottom: 6,
  },
  answerLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  answerText: {
    fontSize: 15,
    fontWeight: '500',
  },
  explanationBox: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  explanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  generalTipsSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  generalTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  stickyButtons: {
    position: 'absolute',
    bottom: '8%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  restartButton: {
    backgroundColor: colors.warning,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultsView;