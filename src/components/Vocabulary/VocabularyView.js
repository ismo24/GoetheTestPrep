import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import ProgressBar from '../common/ProgressBar';
import AudioPlayerInvisible from './AudioPlayerInvisible';
import BoldWordText from './BoldWordText';
import { useExerciseData } from '../../hooks/useExerciseData';

const VocabularyView = ({
  vocabularyItem,
  currentLanguage = 'FR',
  onNext,
  currentExerciseNumber,
  totalExercises,
  onBack,
  onFinishVocabulary,
  onShowFullScreenImage,
  onRevealWord,
  levelId,
  levelInfo
}) => {
  // États pour l'image
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [maxIndex, setMaxIndex] = useState();
  const { getLevelStats } = useExerciseData();
  
useEffect(() => {
  const levelStats = getLevelStats('vocabulary', levelInfo.id);
  const total = levelStats.total;
  if(total && !isNaN(total)){
    setMaxIndex(total)
  }
  
}, [])

  // Refs pour l'audio (évite les re-rendus)
  const audioPlayerRef = useRef(null);

  // Memoiser les données stables
  const audioUrl = useMemo(() => vocabularyItem?.audio_url, [vocabularyItem?.audio_url]);
  const imageUrl = useMemo(() => vocabularyItem?.image_url, [vocabularyItem?.image_url]);

  // Validation de l'URL d'image - memoizée
  const isValidImageUrl = useCallback((url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return false;
    }
    const trimmedUrl = url.trim();
    return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
  }, []);

  // Fonctions stables pour l'image
  const handleImagePress = useCallback(() => {
    if (imageLoaded && !imageError && onShowFullScreenImage && isValidImageUrl(imageUrl)) {
      onShowFullScreenImage(imageUrl);
    }
  }, [imageLoaded, imageError, onShowFullScreenImage, imageUrl, isValidImageUrl]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
    setIsLoading(false);
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setImageError(false);
    setImageLoaded(false);
  }, []);

  // Fonctions pour les traductions - memoizées
  const getWordTranslation = useCallback(() => {
    return vocabularyItem?.word_languages_explanations?.[currentLanguage] || vocabularyItem?.word;
  }, [vocabularyItem?.word_languages_explanations, vocabularyItem?.word, currentLanguage]);

  const getSentenceTranslation = useCallback(() => {
    return vocabularyItem?.sentence_languages_explanations?.[currentLanguage] || vocabularyItem?.sentence;
  }, [vocabularyItem?.sentence_languages_explanations, vocabularyItem?.sentence, currentLanguage]);

  // Fonctions pour l'affichage - memoizées
  const getDisplayedSentence = useCallback(() => {
    if (isRevealed) {
      return vocabularyItem?.sentence;
    } else {
      return vocabularyItem?.text;
    }
  }, [isRevealed, vocabularyItem?.sentence, vocabularyItem?.text]);

  
  const getDisplayedWord = useCallback(() => {
    if (isRevealed) {
      return vocabularyItem?.word;
    } else {
      return getWordTranslation();
    }
  }, [isRevealed, vocabularyItem?.word, getWordTranslation]);


  const getSentenceWord = useCallback(() => {
    if (isRevealed) {
      return vocabularyItem?.word_in_sentence;
    } else {
      return getWordTranslation();
    }
  }, [isRevealed, vocabularyItem?.word_in_sentence, getWordTranslation]);

  // Callback pour quand l'audio se termine
  const handleAudioFinished = useCallback(() => {

  }, []);

  // Fonction pour révéler le mot et jouer l'audio
  const handleReveal = useCallback(async () => {
    setIsRevealed(true);
    
    // Jouer l'audio via le lecteur invisible
    if (audioPlayerRef.current && audioUrl) {
      try {
        await audioPlayerRef.current.playAudio();
      } catch (error) {
        console.error('Erreur lors de la lecture audio:', error);
      }
    }
  }, [audioUrl]);

  // Fonction pour passer au suivant avec nettoyage audio
  const handleGetNext = useCallback(async (value) => {
    // Arrêter l'audio avant de continuer
    if (audioPlayerRef.current) {
      try {
        await audioPlayerRef.current.stopAudio();
      } catch (error) {
        console.error('Erreur lors de l\'arrêt audio:', error);
      }
    }
    
    if (isRevealed) {
      setIsRevealed(false);
    }
    
    if (onRevealWord) {
      try {
        await onRevealWord(vocabularyItem?.id, levelId, value);
      } catch (error) {
        console.error('Erreur lors de la révélation:', error);
      }
    }
    
    if (onNext) {
      onNext();
    } else if (onBack) {
      onBack();
    }
  }, [isRevealed, onRevealWord, vocabularyItem?.id, levelId, onNext, onBack]);

  // Fonction pour fermer avec nettoyage audio
  const handleBack = useCallback(async () => {
    if (audioPlayerRef.current) {
      try {
        await audioPlayerRef.current.stopAudio();
      } catch (error) {
        console.error('Erreur lors de l\'arrêt audio:', error);
      }
    }
    
    if (onBack) {
      onBack();
    }
  }, [onBack]);

  // Nettoyage à la destruction du composant
  useEffect(() => {
    return () => {
      
    };
  }, []);

  return (
    <>
      {/* Lecteur audio invisible */}
      <AudioPlayerInvisible
        ref={audioPlayerRef}
        audioUrl={audioUrl}
        onAudioFinished={handleAudioFinished}
        autoPlay={false}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.exerciseCounter}>
            <ProgressBar 
              currentIndex={currentExerciseNumber || 1}
              totalCount={maxIndex || 1}
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
        <View style={styles.vocabularyCard}>
          
          {/* Section Image */}
          {isValidImageUrl(imageUrl) && (
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
                    source={{ uri: imageUrl }}
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
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Section Mot */}
          <View style={styles.wordSection}>
          <Text 
            style={[
              styles.mainWord, 
              getDisplayedWord().length > 20
                ? { fontSize: 16 }
                : getDisplayedWord().length > 16
                ? { fontSize: 18 }
                : getDisplayedWord().length > 12
                ? { fontSize: 20 }
                : null
            ]}
          >
            {getDisplayedWord()}
          </Text>

          <View style={[styles.underline, !isRevealed && styles.underlineTranslated]} />
        </View>


          {/* Section Phrase */}
          <View style={styles.sentenceSection}>
            {
              isRevealed ? (<BoldWordText 
                sentence={getDisplayedSentence() }
                boldWord={getSentenceWord() } 
                isRevealed={isRevealed}
                />) :

                (<Text style={[styles.germanSentence, !isRevealed && styles.translatedSentenceStyle,
                  ,
                  getDisplayedSentence().length > 40
                  ? { fontSize: 12 , lineHeight:16}
                  : null
                ]}>
                  {getDisplayedSentence()}
                 
                </Text>)
            }

            
            
          </View>

          {/* Section Traductions - affichée seulement après révélation */}
          {isRevealed && (
            <View style={styles.translationSection}>
              <Text style={[styles.translatedSentence,
              getSentenceTranslation().length > 40
              ? { fontSize: 14 , lineHeight:18}
              : null]}>
                {getSentenceTranslation()}
              </Text>
            </View>
          )}

        </View>
      </ScrollView>

      {/* Bouton sticky */}
      <View style={styles.stickyButtonContainer}>
        {isRevealed ? (
          <View style={styles.answerButtonsContainer}>
            <TouchableOpacity
              style={[styles.answerButton, styles.dontKnowButton]}
              onPress={() => handleGetNext(true)}
            >
              <Ionicons name="close" size={36} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.neverButton, styles.dontKnowButton]}
              onPress={() => handleGetNext("never")}
            >
              <Text style={styles.neverText}>Jamais plus</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.answerButton, styles.dontKnowButton]}
              onPress={() => handleGetNext(false)}
            >
              <Ionicons name="checkmark" size={36} color="#000" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.stickyButton}
            onPress={handleReveal}
          >
            <Text style={styles.stickyButtonText}>
              Révéler
            </Text>
          </TouchableOpacity>
        )}
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
    marginTop: Platform.OS === "ios" ? 20 : 0
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
    height: Platform.OS === 'ios' ? 500 : 470,
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
    width: 180,
    height: 180,
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
  wordSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainWord: {
    fontSize: 24,
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
    backgroundColor: '#4CAF50',
  },
  sentenceSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  germanSentence: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 24,
  },
  translatedSentenceStyle: {
    color: '#4CAF50',
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
  stickyButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? '8%' : '4%',
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
    marginHorizontal: 40,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  stickyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseCounter: {
    paddingHorizontal: 16,
    marginLeft: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 250,
    maxWidth: 300,
  },
  answerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  answerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 8,
  },
  neverButton: {
    width: 80,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  neverText: {
    textAlign: "center",
    fontWeight: "600"
  },
  dontKnowButton: {
    backgroundColor: '#FFFFFF',
    padding: 5,
  },
});

export default VocabularyView;