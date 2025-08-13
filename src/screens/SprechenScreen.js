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
  warning: '#FF9500',
  accent: '#FFD60A',
};

const SprechenScreen = ({ navigation }) => {
  const speakingTests = [
    {
      id: 1,
      title: 'Integrated Speaking - Passage, Lecture and Question',
      total: 12,
      completed: 0,
    },
    {
      id: 2,
      title: 'Integrated Speaking - Lecture and Question',
      total: 12,
      completed: 0,
    },
    {
      id: 3,
      title: 'Integrated Speaking (Campus-Related)',
      total: 12,
      completed: 0,
    },
  ];

  const practices = [
    { id: 1, title: 'Practice 12', status: 'Incomplet', isNew: true },
    { id: 2, title: 'Practice 11', status: 'Incomplet', isNew: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Sprechen</Text>
        <TouchableOpacity>
          <Ionicons name="star" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Integrated Speaking Tests */}
        {speakingTests.map((test) => (
          <TouchableOpacity key={test.id} style={styles.testCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="mic" size={24} color={colors.accent} />
            </View>
            <View style={styles.testInfo}>
              <Text style={styles.testTitle}>{test.title}</Text>
              <Text style={styles.testSubtitle}>
                {test.completed} / {test.total} TESTS
              </Text>
            </View>
            <TouchableOpacity style={styles.expandButton}>
              <Ionicons name="chevron-down" size={20} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Practice Sections */}
        {practices.map((practice) => (
          <TouchableOpacity key={practice.id} style={styles.practiceCard}>
            <View style={styles.practiceIconContainer}>
              <Ionicons name="document-text" size={24} color={colors.secondary} />
            </View>
            <View style={styles.practiceInfo}>
              <View style={styles.practiceHeader}>
                <Text style={styles.practiceTitle}>{practice.title}</Text>
                {practice.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newText}>New</Text>
                  </View>
                )}
              </View>
              <Text style={styles.practiceStatus}>{practice.status}</Text>
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color={colors.primary} />
            </TouchableOpacity>
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
  testCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  testInfo: {
    flex: 1,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  testSubtitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  expandButton: {
    padding: 8,
  },
  practiceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  practiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  practiceInfo: {
    flex: 1,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  practiceStatus: {
    fontSize: 14,
    color: colors.gray,
  },
  arrowButton: {
    padding: 8,
  },
});

export default SprechenScreen;