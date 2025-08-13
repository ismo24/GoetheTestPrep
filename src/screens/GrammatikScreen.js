import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  primary: '#FF6B47',
  secondary: '#4A90E2',
  background: '#F8F9FA',
  white: '#FFFFFF',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  text: '#1C1C1E',
  purple: '#9C27B0',
};

const GrammatikScreen = ({ navigation }) => {
  const grammarTopics = [
    {
      id: 1,
      title: 'Artikel (der, die, das)',
      questions: 150,
      completed: 0,
      difficulty: 'Grundstufe'
    },
    {
      id: 2,
      title: 'Präpositionen',
      questions: 200,
      completed: 0,
      difficulty: 'Grundstufe'
    },
    {
      id: 3,
      title: 'Konjugation der Verben',
      questions: 250,
      completed: 0,
      difficulty: 'Grundstufe'
    },
    {
      id: 4,
      title: 'Perfekt und Präteritum',
      questions: 180,
      completed: 0,
      difficulty: 'Mittelstufe'
    },
    {
      id: 5,
      title: 'Modalverben',
      questions: 120,
      completed: 0,
      difficulty: 'Mittelstufe'
    },
    {
      id: 6,
      title: 'Deklination der Adjektive',
      questions: 160,
      completed: 0,
      difficulty: 'Mittelstufe'
    },
    {
      id: 7,
      title: 'Konjunktiv I und II',
      questions: 100,
      completed: 0,
      difficulty: 'Oberstufe'
    },
    {
      id: 8,
      title: 'Passiv',
      questions: 90,
      completed: 0,
      difficulty: 'Oberstufe'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Grundstufe':
        return '#4CAF50'; // Vert
      case 'Mittelstufe':
        return '#FF9800'; // Orange
      case 'Oberstufe':
        return '#F44336'; // Rouge
      default:
        return colors.gray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Grammatik</Text>
        <TouchableOpacity>
          <Ionicons name="star" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="library" size={32} color={colors.purple} />
          </View>
          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>Deutsche Grammatik</Text>
            <Text style={styles.summarySubtitle}>
              Meistern Sie die deutsche Grammatik mit über 2000 Übungen
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Grammatik-Themen</Text>

        {grammarTopics.map((topic) => (
          <TouchableOpacity key={topic.id} style={styles.topicCard}>
            <View style={styles.topicHeader}>
              <View style={styles.topicIcon}>
                <Ionicons name="book" size={20} color={colors.purple} />
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <View style={styles.topicMeta}>
                  <Text style={styles.topicQuestions}>
                    {topic.questions} Fragen
                  </Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(topic.difficulty) }]}>
                    <Text style={styles.difficultyText}>{topic.difficulty}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.progressSection}>
              <Text style={styles.progressText}>{topic.completed}% abgeschlossen</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${topic.completed}%` }]} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  },
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  topicCard: {
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
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  topicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicQuestions: {
    fontSize: 14,
    color: colors.gray,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.purple,
    borderRadius: 2,
  },
});

export default GrammatikScreen;
