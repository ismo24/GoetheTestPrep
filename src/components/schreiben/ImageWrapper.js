import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

const ImageWrapper = ({ imageUrl, questionType, onImagePress }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Ne pas afficher le composant si pas d'URL valide
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
    return null;
  }

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

  const handleImagePress = () => {
    // Seulement permettre le clic si l'image est chargée avec succès
    if (imageLoaded && !imageError && onImagePress) {
      onImagePress(imageUrl);
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

  return (
    <View style={styles.imageContainer}>
      <View style={styles.imageHeader}>
        <Text style={styles.imageTitle}>
          Image
          {/* {getTitle()} */}
        </Text>
      </View>
      
      <View style={styles.separatorLine} />
      
      <View style={styles.imageContent}>
        {imageError ? (
          // Affichage en cas d'erreur
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>Image non disponible</Text>
            <Text style={styles.errorSubText}>Vérifiez votre connexion internet</Text>
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
              style={styles.image}
              resizeMode="contain"
              onLoad={handleImageLoad}
              onError={handleImageError}
              onLoadStart={handleLoadStart}
            />
            
            {/* Indicateur de chargement */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Chargement...</Text>
              </View>
            )}
            
            {/* Indicateur visuel pour montrer que l'image est cliquable */}
            {/* {imageLoaded && !imageError && (
              <View style={styles.clickIndicator}>
                <Text style={styles.clickText}>🔍</Text>
              </View>
            )} */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: colors.white,
    margin: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  separatorLine: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 16,
  },
  imageContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  imageButton: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    color: colors.gray,
  },
  errorContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 20,
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 5,
  },
  errorSubText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  clickIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickText: {
    fontSize: 16,
  },
});

export default ImageWrapper;