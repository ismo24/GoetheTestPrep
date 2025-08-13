import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const getProgressColor = (percentage) => {
    if (percentage === 0) return '#E5E5EA'; // Gris clair (blanc cassé)
    if (percentage <= 50) return '#FF9500'; // Orange
    if (percentage <= 75) return '#FFD60A'; // Jaune
    return '#34C759'; // Vert
  };

  const AnimatedProgressBar = ({ percentage }) => {
    const animatedWidth = new Animated.Value(0);
    
    React.useEffect(() => {
      Animated.timing(animatedWidth, {
        toValue: percentage,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }, [percentage]);
    
    return (
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: getProgressColor(percentage)
            }
          ]}
        />
      </View>
    );
  }; 

const ExerciseListView = ({
  selectedLevel,
  ubungen,
  levelInfo,
  onBack,
  onSelectUbung,
}) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Lesen - {selectedLevel}</Text>
        <TouchableOpacity style={{opacity:0}}>
          <Ionicons name="star" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View
          style={[styles.levelHeader, { backgroundColor: levelInfo.color }]}
        >
          <Ionicons name={levelInfo.icon} size={32} color={colors.white} />
          <View style={styles.levelHeaderText}>
            <Text style={styles.levelHeaderTitle}>{levelInfo.title}</Text>
            <Text style={styles.levelHeaderSubtitle}>{levelInfo.subtitle}</Text>
          </View>
        </View>

        <View style={styles.ubungenSection}>
          {ubungen.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={48} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Keine Übungen für {selectedLevel} verfügbar
              </Text>
            </View>
          ) : (
            ubungen.map((ubung) => (
                <TouchableOpacity
                  key={ubung.id}
                  style={styles.ubungCard}
                  onPress={() => onSelectUbung(ubung)}
                >
                  {/* Header avec icône et titre */}
                  <View style={styles.ubungHeader}>
                    <View style={styles.ubungIconContainer}>
                    <Image source={require('../../../assets/images/lesenImg.png')} style={styles.customIcon} />
                    </View>
                    <Text style={styles.ubungTitle}>{ubung.title}</Text>
                    
                    {/* Badge de statut */}
                    {ubung.completed && (
                      <View style={styles.completedBadge}>
                        <Ionicons name="checkmark" size={16} color={colors.white} />
                      </View>
                    )}
                  </View>
              
                  {/* Informations sur l'exercice */}
                  {/* <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseDetails}>
                      {ubung.questionsCount} {ubung.questionsCount === 1 ? 'Frage' : 'Fragen'}
                    </Text>
                    <Text style={styles.exerciseText}>
                      1 Text zum Lesen
                    </Text>
                  </View> */}

                  {/* Barre de progression */}
                  {/* <View style={styles.progressContainer}>
                    <Text style={styles.progressLabel}>
                      {ubung.lastResult > 0 ? `Letztes Ergebnis: ${ubung.lastResult}%` : 'Noch nicht versucht'}
                    </Text>
                    <AnimatedProgressBar percentage={ubung.lastResult} />
                  </View> */}
              
                  {/* Flèche */}
                  {/* <TouchableOpacity style={styles.expandButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.primary}
                    />
                  </TouchableOpacity> */}
                </TouchableOpacity>
              ))
          )}
        </View>
      </ScrollView>
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
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  levelHeader: {
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  levelHeaderText: {
    marginLeft: 16,
    flex: 1,
  },
  levelHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  levelHeaderSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  ubungenSection: {
    marginBottom: 20,
  },
  ubungCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  
  ubungHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  ubungIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  ubungTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },

  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },

  exerciseInfo: {
    marginBottom: 12,
  },

  exerciseDetails: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 2,
  },

  exerciseText: {
    fontSize: 12,
    color: colors.gray,
  },
  
  progressContainer: {
    marginBottom: 8,
  },
  
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
    marginBottom: 8,
  },
  
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  
  expandButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },

  customIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },

  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 16,
    textAlign: "center",
  },
});

export default ExerciseListView;