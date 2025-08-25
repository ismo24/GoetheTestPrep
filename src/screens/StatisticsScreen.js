import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/Stats/StatCard';
import { colors } from '../styles/colors';

const StatisticsScreen = ({ navigation }) => {
  const stats = [
    { skill: 'Lesen', answered: 0, total: 489, correct: 0 },
    { skill: 'Hören', answered: 0, total: 539, correct: 0 },
    { skill: 'Schreiben', answered: 0, total: 50, correct: 0 },
    { skill: 'Sprechen', answered: 0, total: 46, correct: 0 },
    { skill: 'Wortschatz', answered: 0, total: 4882, correct: 0 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Fortschritt Details</Text>
          <Text style={styles.subtitle}>
            Verfolgen Sie Ihre Lernleistung und analysieren Sie den Fortschritt
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
  statsGrid: {
    padding: 20,
  },
});

export default StatisticsScreen;