// components/common/ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const ProgressBar = ({ 
  currentIndex, 
  totalCount, 
  height = 8, 
  backgroundColor = '#E5E5E5', 
  progressColor = colors.primary 
}) => {
  // Calcul du pourcentage de progression
  const progressPercentage = totalCount > 0 ? (currentIndex / totalCount) * 100 : 0;
  
  // Formatage du texte à afficher
  const progressText = `${currentIndex}/${totalCount}`;

  return (
    <View style={styles.container}>
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBackground, 
            { 
              height: height,
              backgroundColor: backgroundColor 
            }
          ]}
        >
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`,
                height: height,
                backgroundColor: progressColor 
              }
            ]} 
          />
        </View>
      </View>
      
      {/* Texte de progression */}
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>
          {progressText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  progressContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressBackground: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 4,
    transition: 'width 0.3s ease', // Animation fluide sur web
  },
  textContainer: {
    minWidth: 35, // Largeur minimale pour éviter le saut du texte
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
});

export default ProgressBar;