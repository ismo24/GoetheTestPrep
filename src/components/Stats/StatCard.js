import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const StatCard = ({ skill, answered, total, correct }) => {
  // Calculer le pourcentage de progression
  const progressPercentage = total > 0 ? (answered / total) * 100 : 0;
  
  // Calculer le pourcentage de réussite
  const successPercentage = answered > 0 ? (correct / answered) * 100 : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.skill}>{skill}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{answered}/{total}</Text>
        </View>
      </View>
      
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(progressPercentage, 100)}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {progressPercentage.toFixed(1)}%
        </Text>
      </View>

      {/* Statistiques détaillées */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{correct}</Text>
          <Text style={styles.statLabel}>Richtig</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{answered - correct}</Text>
          <Text style={styles.statLabel}>Falsch</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {answered > 0 ? successPercentage.toFixed(1) : '0.0'}%
          </Text>
          <Text style={styles.statLabel}>Erfolg</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  skill: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    minWidth: 40,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
});

export default StatCard;