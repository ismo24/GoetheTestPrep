import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../styles/colors';

const WaveHeader = () => (
  <Svg
    height="30"
    width="100%"
    viewBox="0 0 375 30"
    style={styles.wave}
  >
    <Path
      d="M0,15 Q93.75,0 187.5,15 T375,15 L375,30 L0,30 Z"
      fill="#ffffff"
    />
  </Svg>
);

const LevelSelectionView = ({ levels, onBack, onSelectLevel, getUbungenForLevel }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.greeting}>Neue Geschichten warten!</Text>
            <Text style={styles.title}>Lesen</Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
            <Image 
                    source={require('../../../assets/images/lesenImg.png')} 
                    style={styles.headerIcon} 
                  />
            </View>
          </TouchableOpacity>
        </View>
        <WaveHeader />
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    background: 'linear-gradient(135deg, #FF6B9D 0%, #C471ED 25%, #12C2E9 50%, #C471ED 75%, #FF6B9D 100%)',
    backgroundColor: '#FF6B9D', // Fallback pour React Native
  },
  wave: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  profileButton: {
    width: 44,
    height: 44,
    // borderRadius: 22,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: colors.background,
    marginTop: -15, // Pour que le contenu se superpose légèrement à la vague
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 15,
  },
  levelCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 140,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  },
  levelCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  levelTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  levelTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray,
  },
  customIcon: {
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  headerIcon: {
    width:40,
    height:40,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default LevelSelectionView;