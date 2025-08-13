import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './src/navigation/TabNavigator';
import LesenScreen from './src/screens/LesenScreen';
import HoerenScreen from './src/screens/HoerenScreen';
import SchreibenScreen from './src/screens/SchreibenScreen';
import SprechenScreen from './src/screens/SprechenScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import GrammatikScreen from './src/screens/GrammatikScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
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
  );
}