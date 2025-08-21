import React from 'react';
import { StatusBar, Platform, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppDataProvider } from './src/context/AppDataContext.js';
import AppInitializer from './src/components/common/AppInitializer.js';
import { useFonts } from "expo-font";

// AJOUT : Import des composants d'authentification
import { AuthProvider, useAuth } from './src/hooks/useAuth';
import AuthScreen from './src/screens/AuthScreen';

// Imports existants
import TabNavigator from './src/navigation/TabNavigator';
import LesenScreen from './src/screens/LesenScreen';
import HoerenScreen from './src/screens/HoerenScreen';
import SchreibenScreen from './src/screens/SchreibenScreen';
import SprechenScreen from './src/screens/SprechenScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import GrammatikScreen from './src/screens/GrammatikScreen.js';

const Stack = createStackNavigator();

// AJOUT : Composant pour gérer la navigation avec authentification
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  // Écran de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
      }}>
        <ActivityIndicator size="large" color="#FF6B47" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {isAuthenticated ? ( */}
          {/* // Routes pour utilisateurs authentifiés */}
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Lesen" component={LesenScreen} />
            <Stack.Screen name="Hoeren" component={HoerenScreen} />
            <Stack.Screen name="Schreiben" component={SchreibenScreen} />
            <Stack.Screen name="Sprechen" component={SprechenScreen} />
            <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
            <Stack.Screen name="Grammatik" component={GrammatikScreen} />
          </>
        {/* ) : ( */}
          {/* // Route d'authentification pour utilisateurs non connectés */}
          {/* <Stack.Screen name="Auth" component={AuthScreen} /> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
    "Dancing-Font": require("./assets/Fonts/DancingScript-VariableFont_wght.ttf"),
    "OpenSans-Regular": require("./assets/Fonts/OpenSans-VariableFont_wdth,wght.ttf"),
  });

  // Attendez que les polices soient chargées
  if (!fontsLoaded) {
    return null; // ou un écran de chargement
  }

  return (
    // MODIFICATION : Envelopper avec AuthProvider en premier
    <AuthProvider>
      <AppDataProvider>
        <AppInitializer>
          <SafeAreaProvider>
            <StatusBar
              barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
              backgroundColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
              translucent={false}
            />
            {/* MODIFICATION : Utiliser AppNavigator au lieu de NavigationContainer directement */}
            <AppNavigator />
          </SafeAreaProvider>
        </AppInitializer>
      </AppDataProvider>
    </AuthProvider>
  );
}