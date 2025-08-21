// services/AuthService.js - Version Expo corrigée
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';


// Configuration Firebase - Remplacez par vos vraies valeurs
const firebaseConfig = {
  apiKey: "AIzaSyBukaFXoxaMlJd96Pl2vTnCphMpE8F9u9I",
  authDomain: "goethe-expert.firebaseapp.com",
  projectId: "goethe-expert",
  storageBucket: "goethe-expert.firebasestorage.app",
  messagingSenderId: "1041767585747",
  appId: "1:1041767585747:web:5a14130d65cab91c4dc126",
  measurementId: "G-1KZ42VLRTQ"
};

// Initialisation Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

class AuthService {
  constructor() {
    this.auth = auth;
  }

  // Connexion avec email/mot de passe
  async signInWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      await this.saveUserLocally(user);
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Création de compte avec email/mot de passe
  async signUpWithEmail(email, password, displayName = '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Mettre à jour le profil utilisateur
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      await this.saveUserLocally(user);

      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || displayName,
          photoURL: user.photoURL,
        }
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  

// Ajouter cette méthode à la classe AuthService
async deleteAccount() {
  try {
    const user = this.getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'Aucun utilisateur connecté'
      };
    }

    // Supprimer l'utilisateur de Firebase Auth
    await deleteUser(user);
    
    // Nettoyer le stockage local
    await AsyncStorage.multiRemove(['user', 'userToken']);
    
    return {
      success: true,
      message: 'Compte supprimé avec succès'
    };
  } catch (error) {
    // Si l'utilisateur doit se reconnecter pour cette action sensible
    if (error.code === 'auth/requires-recent-login') {
      return {
        success: false,
        error: 'Veuillez vous reconnecter avant de supprimer votre compte'
      };
    }
    
    return {
      success: false,
      error: this.handleAuthError(error)
    };
  }
}

  // Connexion avec Google (utilise la réponse d'expo-auth-session)
  async signInWithGoogle(authResponse) {
    try {
      if (authResponse?.type === 'success') {
        const { id_token, access_token } = authResponse.params;
        
        const credential = GoogleAuthProvider.credential(id_token, access_token);
        const userCredential = await signInWithCredential(this.auth, credential);
        const user = userCredential.user;

        await this.saveUserLocally(user);

        return {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
        };
      }

      return {
        success: false,
        error: 'Connexion Google annulée'
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Connexion avec Apple (Expo - iOS uniquement)
  async signInWithApple() {
    try {
      if (Platform.OS !== 'ios') {
        return {
          success: false,
          error: 'Apple Sign-In disponible uniquement sur iOS'
        };
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Pour simplifier, on simule une connexion réussie
      // En production, vous devrez configurer Apple Auth avec Firebase
      const userData = {
        uid: credential.user,
        email: credential.email || 'apple.user@example.com',
        displayName: credential.fullName ? 
          `${credential.fullName.givenName} ${credential.fullName.familyName}` : 
          'Utilisateur Apple',
        photoURL: null,
      };

      await this.saveUserLocally({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL
      });

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        return {
          success: false,
          error: 'Connexion Apple annulée'
        };
      }
      
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Réinitialisation du mot de passe
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return {
        success: true,
        message: 'Email de réinitialisation envoyé'
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Déconnexion
  async signOut() {
    try {
      await signOut(this.auth);
      await AsyncStorage.multiRemove(['user', 'userToken']);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // Écouter les changements d'état d'authentification
  onAuthStateChanged(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  // Sauvegarder les informations utilisateur localement
  async saveUserLocally(user) {
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastSignIn: new Date().toISOString()
      };

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      // Obtenir le token d'authentification si disponible
      if (user.getIdToken) {
        const token = await user.getIdToken();
        await AsyncStorage.setItem('userToken', token);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde locale:', error);
    }
  }

  // Récupérer les informations utilisateur locales
  async getUserFromStorage() {
    try {
      const userData = await AsyncStorage.getItem('user');
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (userData && userToken) {
        return {
          user: JSON.parse(userData),
          token: userToken
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données locales:', error);
      return null;
    }
  }

  // Gestion des erreurs d'authentification
  handleAuthError(error) {
    console.log("erreur message :", error.code)
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Aucun utilisateur trouvé avec cet email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'auth/invalid-email':
        return 'Format d\'email invalide';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Réessayez plus tard';
      case 'auth/network-request-failed':
        return 'Erreur de connexion réseau';
      case 'auth/invalid-credential':
        return 'Email ou mot de passe incorrect';
      default:
        return error.message || 'Une erreur est survenue';
    }
  }

  // Vérifier si l'utilisateur est connecté
  async isUserSignedIn() {
    const user = this.getCurrentUser();
    const localData = await this.getUserFromStorage();
    return user !== null && localData !== null;
  }
}

export default new AuthService();