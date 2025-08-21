// components/ProtectedRoute.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import AuthScreen from '../screens/AuthScreen';

const ProtectedRoute = ({ children, navigation }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B47" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen navigation={navigation} />;
  }

  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ProtectedRoute;