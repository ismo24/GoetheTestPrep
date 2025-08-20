// LevelSelectionView.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const LevelSelectionView = ({ levels, onBack, onSelectLevel, getUbungenForLevel, userNativeLanguage = "AR" }) => {
  
  // Traductions pour l'interface
  const interfaceTranslations = {
    newStoriesWaiting: {
      "DE": "Neue Geschichten warten!",
      "FR": "De nouvelles histoires vous attendent !",
      "EN": "New stories are waiting!",
      "ES": "¡Nuevas historias te esperan!",
      "PT": "Novas histórias estão esperando!",
      "PL": "Nowe historie czekają!",
      "RU": "Новые истории ждут!",
      "TR": "Yeni hikayeler bekliyor!",
      "IT": "Nuove storie ti aspettano!",
      "UK": "Нові історії чекають!",
      "VI": "Những câu chuyện mới đang chờ!",
      "TL": "Naghihintay ang mga bagong kwento!",
      "ZH": "新故事在等待！",
      "ID": "Cerita baru menunggu!",
      "TH": "เรื่องราวใหม่รอคุณอยู่!",
      "MS": "Cerita baru menanti!",
      "AR": "قصص جديدة في الانتظار!"
    },
    reading: {
      "DE": "Lesen",
      "FR": "Lecture",
      "EN": "Reading",
      "ES": "Lectura",
      "PT": "Leitura",
      "PL": "Czytanie",
      "RU": "Чтение",
      "TR": "Okuma",
      "IT": "Lettura",
      "UK": "Читання",
      "VI": "Đọc",
      "TL": "Pagbabasa",
      "ZH": "阅读",
      "ID": "Membaca",
      "TH": "การอ่าน",
      "MS": "Membaca",
      "AR": "القراءة"
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.greeting}>
              {interfaceTranslations.newStoriesWaiting[userNativeLanguage]}
            </Text>
            <Text style={styles.title}>
              {interfaceTranslations.reading[userNativeLanguage]}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Ionicons name="book" size={24} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
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
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
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
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',        // AJOUT : Centre le texte horizontalement
    lineHeight: 32,             // AJOUT : Espacement entre les lignes
    flexWrap: 'wrap',           // AJOUT : Permet le retour à la ligne
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: colors.background,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 140,
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default LevelSelectionView;