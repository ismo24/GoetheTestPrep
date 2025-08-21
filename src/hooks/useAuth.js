// hooks/useAuth.js - Version Expo simplifiée
import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AuthService from '../services/AuthService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Écouter les changements d'état Firebase
    const unsubscribe = onAuthStateChanged(AuthService.auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        await AuthService.saveUserLocally(firebaseUser);
      } else {
        // Vérifier les données locales en cas de mode hors ligne
        const localData = await AuthService.getUserFromStorage();
        if (localData) {
          setUser(localData.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    signOut: async () => {
      const result = await AuthService.signOut();
      if (result.success) {
        setUser(null);
        setIsAuthenticated(false);
      }
      return result;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};