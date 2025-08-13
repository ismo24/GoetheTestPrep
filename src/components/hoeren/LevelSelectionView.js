import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const LevelSelectionView = ({ levels, onBack, onSelectLevel, getUbungenForLevel }) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Hören</Text>
        <TouchableOpacity style={{ opacity: 0 }}>
          <Ionicons name="star" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.levelsGrid}>
          {levels.map((level) => {
            const ubungenCount = getUbungenForLevel(level.id).length;
            
            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelCard}
                onPress={() => onSelectLevel(level.id)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.levelTextContainer}>
                    <Text style={styles.levelCode}>{level.id}</Text>
                    <Text style={styles.levelTitle}>{level.title}</Text>
                  </View>
                  <Image 
                    source={level.image} 
                    style={[
                      styles.customIcon, 
                      {
                        width: level.imageSize?.width || 50,
                        height: level.imageSize?.height || 50,
                        transform: [
                          { translateX: level.imageOffset?.x || 10 },
                          { translateY: level.imageOffset?.y || 10 }
                        ]
                      }
                    ]} 
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color={colors.warning} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Tipp zum Hörverständnis</Text>
            <Text style={styles.tipText}>
              Verwenden Sie Kopfhörer für die beste Audioqualität und konzentrieren Sie sich auf den Kontext.
            </Text>
          </View>
        </View> */}
      </ScrollView>
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
  content: {
    padding: 20,
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  levelCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    width: '47%', // Pour avoir 2 colonnes avec un peu d'espace
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 140,
    overflow: 'hidden', // Masque les parties qui dépassent
  },
  cardContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  },
  levelCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  levelTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  levelTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray,
  },
  customIcon: {
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipContent: {
    marginLeft: 12,
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
});

export default LevelSelectionView;