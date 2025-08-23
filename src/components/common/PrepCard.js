import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const PrepCard = ({ title, subtitle, customImage, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.prepCard} onPress={onPress}>
      <View style={styles.prepCardContent}>
        {/* Image à gauche */}
        <View style={[styles.imageContainer, { backgroundColor: color }]}>
          <Image source={customImage} style={styles.prepImage} />
        </View>
        
        {/* Contenu texte */}
        <View style={styles.textContent}>
          <Text style={styles.prepTitle}>{title}</Text>
          <Text style={styles.prepSubtitle}>{subtitle}</Text>
        </View>
        
        {/* Flèche à droite */}
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color={colors.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prepCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  prepCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  prepImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  textContent: {
    flex: 1,
  },
  prepTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  prepSubtitle: {
    fontSize: 14,
    color: colors.gray,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF8A65',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrepCard;