import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import ProgressBar from '../common/ProgressBar';

const VocabularyView = ({
  vocabularyItem,
  currentLanguage = 'FR', // Langue actuelle sélectionnée par l'utilisateur
  onNext,
  currentExerciseNumber,
  totalExercises,
  onBack,
  onFinishVocabulary,
  onShowFullScreenImage,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false); // État pour gérer la révélation

  // Validation de l'URL d'image
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return false;
    }
    const trimmedUrl = url.trim();
    return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
  };

  const handleImagePress = () => {
    if (imageLoaded && !imageError && onShowFullScreenImage && isValidImageUrl(vocabularyItem.image_url)) {
      onShowFullScreenImage(vocabularyItem.image_url);
    }
  };

  const handleGetNext = () => {
    if(isRevealed){setIsRevealed(false)}
    onNext?onNext():onBack()
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setImageError(false);
    setImageLoaded(false);
  };

  // Récupérer les traductions
  const getWordTranslation = () => {
    return vocabularyItem.word_languages_explanations?.[currentLanguage] || vocabularyItem.word;
  };

  const getSentenceTranslation = () => {
    return vocabularyItem.sentence_languages_explanations?.[currentLanguage] || vocabularyItem.sentence;
  };

  // Fonction pour révéler le mot allemand
  const handleReveal = () => {
    setIsRevealed(true);
  };

  // Fonction pour obtenir le texte à afficher selon l'état de révélation
  const getDisplayedSentence = () => {
    if (isRevealed) {
      return vocabularyItem.sentence; // Phrase complète en allemand
    } else {
      // Remplacer le mot allemand par sa traduction dans la langue natale
      // const wordTranslation = getWordTranslation();
      return vocabularyItem.text
    }
  };

  // Fonction pour obtenir le mot principal à afficher
  const getDisplayedWord = () => {
    if (isRevealed) {
      return vocabularyItem.word; // Mot allemand
    } else {
      return getWordTranslation(); // Traduction dans la langue natale
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
        <View style={styles.exerciseCounter}>
          <ProgressBar 
            currentIndex={currentExerciseNumber || 1}
            totalCount={totalExercises || 1}
            height={8}
            backgroundColor="#E5E5E5"
            progressColor={colors.primary}
          />
        </View>
        </View>
        <TouchableOpacity style={{ opacity: 0 }}>
          <Text style={styles.headerTitle}>.</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Carte principale du vocabulaire */}
        <View style={styles.vocabularyCard}>
          
          {/* Section Image */}
          {isValidImageUrl(vocabularyItem.image_url) && (
            <View style={styles.imageSection}>
              {imageError ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorIcon}>🖼️</Text>
                  <Text style={styles.errorText}>Image non disponible</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handleImagePress}
                  activeOpacity={imageLoaded ? 0.8 : 1}
                  style={styles.imageButton}
                  disabled={!imageLoaded || imageError}
                >
                  <Image 
                    source={{ uri: vocabularyItem.image_url }}
                    style={styles.vocabularyImage}
                    resizeMode="cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    onLoadStart={handleLoadStart}
                  />
                  
                  {isLoading && (
                    <View style={styles.loadingContainer}>
                      <Text style={styles.loadingText}>Chargement...</Text>
                    </View>
                  )}
                  
                  {imageLoaded && !imageError && (
                    <View style={styles.expandIndicator}>
                      <Ionicons name="expand" size={16} color={colors.white} />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Section Mot */}
          <View style={styles.wordSection}>
            <Text style={styles.mainWord}>{getDisplayedWord()}</Text>
            <View style={[styles.underline, !isRevealed && styles.underlineTranslated]} />
          </View>

          {/* Section Phrase */}
          <View style={styles.sentenceSection}>
            <Text style={[styles.germanSentence, !isRevealed && styles.translatedSentenceStyle]}>
              {getDisplayedSentence()}
            </Text>
          </View>

          {/* Section Traductions - affichée seulement après révélation */}
          {isRevealed && (
            <View style={styles.translationSection}>
              <Text style={styles.translatedSentence}>
                {getSentenceTranslation()}
              </Text>
            </View>
          )}

        </View>

       

      </ScrollView>

      {/* Bouton sticky */}
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity
          style={[styles.stickyButton, !isRevealed && styles.revealButton]}
          onPress={isRevealed ? handleGetNext : handleReveal}
        >
          <Text style={styles.stickyButtonText}>
            { isRevealed && !onNext ? "Terminer" :isRevealed ? 'CONTINUER' : 'RÉVÉLER'}
          </Text>
         
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.background,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6D6DB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  vocabularyCard: {
    backgroundColor: colors.white,
    margin: 25,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  imageSection: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  imageButton: {
    position: 'relative',
  },
  vocabularyImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 16,
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray,
  },
  errorContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 16,
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  expandIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  underline: {
    height: 3,
    width: 80,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  underlineTranslated: {
    backgroundColor: '#4CAF50', // Couleur différente pour la traduction
  },
  sentenceSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  germanSentence: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 26,
  },
  translatedSentenceStyle: {
    color: '#4CAF50', // Couleur pour indiquer que c'est une traduction
    fontStyle: 'italic',
  },
  translationSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  translatedSentence: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeader: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  translationsContainer: {
    gap: 12,
  },
  translationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  translationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    width: 60,
    flexShrink: 0,
  },
  translationValue: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: '8%',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stickyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
    marginHorizontal: 30,
    backgroundColor: colors.success,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  revealButton: {
    backgroundColor: '#FF9800', // Couleur orange pour le bouton "révéler"
  },
  stickyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  exerciseCounter: {
    paddingHorizontal: 16,
    marginLeft:12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 250, // 120 * 4 = 480
    maxWidth: 300, // Limite la largeur maximale
    // borderColor:"red",
    // borderWidth:1
  },
});

export default VocabularyView;