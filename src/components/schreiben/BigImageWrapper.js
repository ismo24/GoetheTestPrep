import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const BigImageWrapper = ({ imageUrl, questionType, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Déterminer le titre en fonction du type de question
  const getTitle = () => {
    switch (questionType) {
      case 'graphik_description':
        return 'Graphique';
      case 'karikatur_description':
        return 'Caricature';
      default:
        return 'Image';
    }
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

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      {/* Header avec bouton de fermeture */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>{getTitle()}</Text> */}
        <View style={styles.placeholder} />
      </View>

      {/* Contenu principal */}
      <TouchableOpacity 
        style={styles.imageContainer}
        activeOpacity={1}
        onPress={handleClose}
      >
        {imageError ? (
          // Affichage en cas d'erreur
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>Impossible de charger l'image</Text>
            <Text style={styles.errorSubText}>Vérifiez votre connexion internet</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleClose}>
              <Text style={styles.retryText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Image 
              source={{ uri: imageUrl }}
              style={styles.fullScreenImage}
              resizeMode="contain"
              onLoad={handleImageLoad}
              onError={handleImageError}
              onLoadStart={handleLoadStart}
            />
            
            {/* Indicateur de chargement */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Chargement de l'image...</Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>

      {/* Instructions pour fermer */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, 
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullScreenImage: {
    width: Dimensions.get('window').width - 40,
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    fontSize: 16,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  errorText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default BigImageWrapper;