import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const SkillCard = ({ title, subtitle, icon, color, onPress, customImage }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[
        styles.iconContainer, 
        customImage ? styles.imageContainer : { backgroundColor: color }
      ]}>
        {customImage ? (
          <Image source={customImage} style={styles.customIcon} />
        ) : (
          <Ionicons name={icon} size={24} color={colors.white} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    width: '48%',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageContainer: {
    backgroundColor: 'transparent', // 👈 Pas de background pour les images
    // Ou vous pouvez utiliser :
    // backgroundColor: colors.lightGray, // Background très léger
    // backgroundColor: 'rgba(0,0,0,0.05)', // Background semi-transparent
  },
  customIcon: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
  },
});

export default SkillCard;
