import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppInitialization } from '../../hooks/useAppInitialization';
import { colors } from '../../styles/colors'; 
import SplashAnimation from './SplashAnimation';

const AppInitializer = ({ children }) => {
  const { isLoading, error, retry } = useAppInitialization();
  const [minTime,setMinTime]=useState(false)

  useEffect (() => {
    // Timer de 3 secondes pour fermer l'écran automatiquement
    const timer = setTimeout(() => {
      setMinTime(true);
    }, 3500);

    // Nettoyage du timer si le composant se démonte
    return () => clearTimeout(timer);
  }, [setMinTime]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color={colors.primary} />
  //       <Text style={styles.loadingText}>Chargement des données...</Text>
  //     </View>
  //   );
  // }

  if ((isLoading || error || !minTime )) {
    return (
      <SplashAnimation />
    );
  }

  

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
  },
  errorText: {
    fontSize: 16,
    color: colors.error || '#FF0000',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default AppInitializer;