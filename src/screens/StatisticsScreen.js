import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../components/Stats/StatCard';
import { colors } from '../styles/colors';
import { useExerciseData } from '../hooks/useExerciseData';

const StatisticsScreen = ({ navigation }) => {

  const { getCachedOverallStats, refreshOverallStats } = useExerciseData();
  const [statvalues, setStatvalues] = useState(null);
  const [loading, setLoading] = useState(true);

  const stats = [
    { skill: 'Lesen', answered:loading?0: 0, total:loading?0: statvalues.lesen.total, correct:loading?0: statvalues.lesen.success, average:loading?0: statvalues.lesen.average,level:loading?0: statvalues.lesen.level},
    { skill: 'Hören', answered:loading?0: 0, total: loading?0:statvalues.hoeren.total, correct: loading?0:statvalues.hoeren.success,average:loading?0: statvalues.hoeren.average,level:loading?0: statvalues.hoeren.level },
    { skill: 'Schreiben', answered:loading?0: 0, total: loading?0:statvalues.schreiben.total, correct:loading?0: statvalues.schreiben.success,average:loading?0: statvalues.schreiben.average,level:loading?0: statvalues.schreiben.level },
    { skill: 'Sprechen', answered:loading?0: 0, total:loading?0: statvalues.sprechen.total, correct:loading?0: statvalues.sprechen.success,average:loading?0: statvalues.sprechen.average,level:loading?0: statvalues.sprechen.level },
    { skill: 'Wortschatz', answered:loading?0: 0, total:loading?0: statvalues.vocabulary.total, correct:loading?0: statvalues.vocabulary.success,average:loading?0: statvalues.vocabulary.average,level:loading?0: statvalues.vocabulary.level },
    { skill: 'Grammatik', answered:loading?0: 0, total:loading?0: statvalues.grammar.total, correct:loading?0: statvalues.grammar.success,average:loading?0: statvalues.grammar.average,level:loading?0: statvalues.grammar.level }
  ];

  useEffect(() => {
    const loadStats = () => {
      setLoading(true);
      
      // Essayer le cache d'abord
      let result = getCachedOverallStats();
      
      // Si pas de cache valide, recalculer
      if (!result || Object.keys(result).length === 0) {
        result = refreshOverallStats();
      }
      
      setStatvalues(result);
      setLoading(false);

      // console.log("resultats de stats :",result)
    };

    loadStats();
  }, [getCachedOverallStats, refreshOverallStats]);
  

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