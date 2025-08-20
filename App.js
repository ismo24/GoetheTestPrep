import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppDataProvider } from './src/context/AppDataContext.js';
import AppInitializer from './src/components/common/AppInitializer.js';
import { useFonts } from "expo-font";
import TabNavigator from './src/navigation/TabNavigator';
import LesenScreen from './src/screens/LesenScreen';
import HoerenScreen from './src/screens/HoerenScreen';
import SchreibenScreen from './src/screens/SchreibenScreen';
import SprechenScreen from './src/screens/SprechenScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import GrammatikScreen from './src/screens/GrammatikScreen.js';

const Stack = createStackNavigator();

export default function App() {

  // useFonts({
  //   "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  //   "Dancing-Font": require("./assets/Fonts/DancingScript-VariableFont_wght.ttf"),
  //   "Open-sans": require("./assets/Fonts/OpenSans-VariableFont_wdth,wght.ttf"),
  // });

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

    <AppDataProvider>
      <AppInitializer>
      <SafeAreaProvider>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        backgroundColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Lesen" component={LesenScreen} />
          <Stack.Screen name="Hoeren" component={HoerenScreen} />
          <Stack.Screen name="Schreiben" component={SchreibenScreen} />
          <Stack.Screen name="Sprechen" component={SprechenScreen} />
          <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
          <Stack.Screen name="Grammatik" component={GrammatikScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
      </AppInitializer>
    </AppDataProvider>

   
  );
}