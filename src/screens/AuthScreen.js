// screens/AuthScreen.js - Version avec bouton de fermeture
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthService from '../services/AuthService';

const AuthScreen = ({ navigation, onClose }) => { // AJOUT : prop onClose
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation de l'email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation du mot de passe
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  // Connexion avec email/mot de passe
  const handleEmailSignIn = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    const result = await AuthService.signInWithEmail(email, password);
    setLoading(false);

    if (result.success) {
      // MODIFICATION : Fermer le modal au lieu de navigate
      if (onClose) {
        onClose();
      } else {
        navigation.replace('Main');
      }
    } else {
      Alert.alert('Erreur de connexion', result.error);
    }
  };

  // Création de compte
  const handleEmailSignUp = async () => {
    if (!displayName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre nom');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    const result = await AuthService.signUpWithEmail(email, password, displayName);
    setLoading(false);

    if (result.success) {
      // Alert.alert('Succès', 'Compte créé avec succès', [
      //   { 
      //     text: 'OK', 
      //     onPress: () => {
      //       // MODIFICATION : Fermer le modal au lieu de navigate
      //       if (onClose) {
      //         onClose();
      //       } else {
      //         navigation.replace('Main');
      //       }
      //     }
      //   }
      // ]);
    } else {
      Alert.alert('Erreur de création de compte', result.error);
    }
  };

  // Réinitialisation du mot de passe
  const handleForgotPassword = () => {
    if (!isValidEmail(email)) {
      Alert.alert('Email requis', 'Veuillez entrer votre email pour réinitialiser le mot de passe');
      return;
    }

    Alert.alert(
      'Réinitialiser le mot de passe',
      `Envoyer un email de réinitialisation à ${email} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Envoyer',
          onPress: async () => {
            const result = await AuthService.resetPassword(email);
            if (result.success) {
              Alert.alert('Succès', 'Email de réinitialisation envoyé');
            } else {
              Alert.alert('Erreur', result.error);
            }
          }
        }
      ]
    );
  };

  // Basculer entre connexion et inscription
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // AJOUT : Fonction pour gérer la fermeture
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* MODIFICATION : Header avec bouton de fermeture */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Text>
            {/* Espace vide pour centrer le titre */}
            <View style={styles.closeButton} />
          </View>

          {/* Logo Space */}
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>LOGO</Text>
            </View>
          </View>

          {/* App Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>
              <Text style={styles.appTitleOrange}>Goethe </Text>
              <Text style={styles.appTitleBlack}>Expert</Text>
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Nom (uniquement pour l'inscription) */}
            {isSignUp && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#B0B0B0"
                  value={displayName}
                  onChangeText={setDisplayName}
                  autoCapitalize="words"
                />
              </View>
            )}

            {/* Email */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#B0B0B0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Mot de passe */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#B0B0B0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {/* Confirmation mot de passe (uniquement pour l'inscription) */}
            {isSignUp && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#B0B0B0"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Forgot Password (uniquement pour la connexion) */}
            {!isSignUp && (
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot password</Text>
              </TouchableOpacity>
            )}

            {/* Main Action Button */}
            <TouchableOpacity
              style={[styles.mainButton, loading && styles.mainButtonDisabled]}
              onPress={isSignUp ? handleEmailSignUp : handleEmailSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.mainButtonText}>
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Toggle Auth Mode */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.toggleButtonText}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  logoText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appTitleOrange: {
    color: '#FF6B47',
  },
  appTitleBlack: {
    color: '#000',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  mainButton: {
    backgroundColor: '#FF6B47',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  mainButtonDisabled: {
    opacity: 0.7,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    color: '#666',
    fontSize: 14,
  },
  toggleButtonText: {
    color: '#FF6B47',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreen;



// // screens/AuthScreen.js - Version Expo
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import * as Google from 'expo-auth-session/providers/google';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import AuthService from '../services/AuthService';

// const AuthScreen = ({ navigation }) => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [displayName, setDisplayName] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Configuration Google Auth
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: 'your-expo-client-id',
//     iosClientId: 'your-ios-client-id',
//     androidClientId: 'your-android-client-id',
//     webClientId: 'your-web-client-id',
//   });

//   // Gestion de la réponse Google
//   useEffect(() => {
//     if (response?.type === 'success') {
//       handleGoogleSignInResponse(response);
//     }
//   }, [response]);

//   // Validation de l'email
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Validation du mot de passe
//   const isValidPassword = (password) => {
//     return password.length >= 6;
//   };

//   // Connexion avec email/mot de passe
//   const handleEmailSignIn = async () => {
//     if (!isValidEmail(email)) {
//       Alert.alert('Erreur', 'Veuillez entrer un email valide');
//       return;
//     }

//     if (!isValidPassword(password)) {
//       Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
//       return;
//     }

//     setLoading(true);
//     const result = await AuthService.signInWithEmail(email, password);
//     setLoading(false);

//     if (result.success) {
//       navigation.replace('Main');
//     } else {
//       Alert.alert('Erreur de connexion', result.error);
//     }
//   };

//   // Création de compte
//   const handleEmailSignUp = async () => {
//     if (!displayName.trim()) {
//       Alert.alert('Erreur', 'Veuillez entrer votre nom');
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert('Erreur', 'Veuillez entrer un email valide');
//       return;
//     }

//     if (!isValidPassword(password)) {
//       Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
//       return;
//     }

//     setLoading(true);
//     const result = await AuthService.signUpWithEmail(email, password, displayName);
//     setLoading(false);

//     if (result.success) {
//       Alert.alert('Succès', 'Compte créé avec succès', [
//         { text: 'OK', onPress: () => navigation.replace('Main') }
//       ]);
//     } else {
//       Alert.alert('Erreur de création de compte', result.error);
//     }
//   };

//   // Gestion de la réponse Google
//   const handleGoogleSignInResponse = async (response) => {
//     setLoading(true);
//     const result = await AuthService.signInWithGoogle(response);
//     setLoading(false);

//     if (result.success) {
//       navigation.replace('Main');
//     } else {
//       Alert.alert('Erreur Google Sign-In', result.error);
//     }
//   };

//   // Connexion avec Google
//   const handleGoogleSignIn = () => {
//     promptAsync();
//   };

//   // Connexion avec Apple
//   const handleAppleSignIn = async () => {
//     if (Platform.OS !== 'ios') {
//       Alert.alert('Non disponible', 'Apple Sign-In est disponible uniquement sur iOS');
//       return;
//     }

//     setLoading(true);
//     const result = await AuthService.signInWithApple();
//     setLoading(false);

//     if (result.success) {
//       navigation.replace('Main');
//     } else {
//       Alert.alert('Erreur Apple Sign-In', result.error);
//     }
//   };

//   // Réinitialisation du mot de passe
//   const handleForgotPassword = () => {
//     if (!isValidEmail(email)) {
//       Alert.alert('Email requis', 'Veuillez entrer votre email pour réinitialiser le mot de passe');
//       return;
//     }

//     Alert.alert(
//       'Réinitialiser le mot de passe',
//       `Envoyer un email de réinitialisation à ${email} ?`,
//       [
//         { text: 'Annuler', style: 'cancel' },
//         {
//           text: 'Envoyer',
//           onPress: async () => {
//             const result = await AuthService.resetPassword(email);
//             if (result.success) {
//               Alert.alert('Succès', 'Email de réinitialisation envoyé');
//             } else {
//               Alert.alert('Erreur', result.error);
//             }
//           }
//         }
//       ]
//     );
//   };

//   // Basculer entre connexion et inscription
//   const toggleAuthMode = () => {
//     setIsSignUp(!isSignUp);
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setDisplayName('');
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidingView}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => navigation.goBack()}
//             >
//               <Ionicons name="chevron-back" size={24} color="#666" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>
//               {isSignUp ? 'Sign Up' : 'Sign In'}
//             </Text>
//           </View>

//           {/* Logo Space */}
//           <View style={styles.logoContainer}>
//             <View style={styles.logoPlaceholder}>
//               <Text style={styles.logoText}>LOGO</Text>
//             </View>
//           </View>

//           {/* App Title */}
//           <View style={styles.titleContainer}>
//             <Text style={styles.appTitle}>
//               <Text style={styles.appTitleOrange}>Goethe</Text>
//               <Text style={styles.appTitleBlack}>Test Pro</Text>
//             </Text>
//           </View>

//           {/* Form */}
//           <View style={styles.formContainer}>
//             {/* Nom (uniquement pour l'inscription) */}
//             {isSignUp && (
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your full name"
//                   placeholderTextColor="#B0B0B0"
//                   value={displayName}
//                   onChangeText={setDisplayName}
//                   autoCapitalize="words"
//                 />
//               </View>
//             )}

//             {/* Email */}
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#B0B0B0"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />
//             </View>

//             {/* Mot de passe */}
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={[styles.input, styles.passwordInput]}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#B0B0B0"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity
//                 style={styles.eyeButton}
//                 onPress={() => setShowPassword(!showPassword)}
//               >
//                 <Ionicons
//                   name={showPassword ? 'eye-outline' : 'eye-off-outline'}
//                   size={20}
//                   color="#666"
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Confirmation mot de passe (uniquement pour l'inscription) */}
//             {isSignUp && (
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={[styles.input, styles.passwordInput]}
//                   placeholder="Confirm your password"
//                   placeholderTextColor="#B0B0B0"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry={!showConfirmPassword}
//                   autoCapitalize="none"
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeButton}
//                   onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   <Ionicons
//                     name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
//                     size={20}
//                     color="#666"
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}

//             {/* Forgot Password (uniquement pour la connexion) */}
//             {!isSignUp && (
//               <TouchableOpacity
//                 style={styles.forgotPasswordButton}
//                 onPress={handleForgotPassword}
//               >
//                 <Text style={styles.forgotPasswordText}>Forgot password</Text>
//               </TouchableOpacity>
//             )}

//             {/* Main Action Button */}
//             <TouchableOpacity
//               style={[styles.mainButton, loading && styles.mainButtonDisabled]}
//               onPress={isSignUp ? handleEmailSignUp : handleEmailSignIn}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" size="small" />
//               ) : (
//                 <Text style={styles.mainButtonText}>
//                   {isSignUp ? 'Sign Up' : 'Sign In'}
//                 </Text>
//               )}
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerContainer}>
//               <View style={styles.dividerLine} />
//               <Text style={styles.dividerText}>Or sign in with</Text>
//               <View style={styles.dividerLine} />
//             </View>

//             {/* Social Login Buttons */}
//             <View style={styles.socialButtonsContainer}>
//               <TouchableOpacity
//                 style={styles.socialButton}
//                 onPress={handleGoogleSignIn}
//                 disabled={loading || !request}
//               >
//                 <Text style={styles.socialButtonText}>G</Text>
//               </TouchableOpacity>

//               {Platform.OS === 'ios' && (
//                 <TouchableOpacity
//                   style={[styles.socialButton, styles.appleButton]}
//                   onPress={handleAppleSignIn}
//                   disabled={loading}
//                 >
//                   <Ionicons name="logo-apple" size={24} color="#fff" />
//                 </TouchableOpacity>
//               )}
//             </View>

//             {/* Toggle Auth Mode */}
//             <View style={styles.toggleContainer}>
//               <Text style={styles.toggleText}>
//                 {isSignUp ? "Already have an account? " : "Don't have an account? "}
//               </Text>
//               <TouchableOpacity onPress={toggleAuthMode}>
//                 <Text style={styles.toggleButtonText}>
//                   {isSignUp ? 'Sign In' : 'Sign Up'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 16,
//     color: '#000',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   logoPlaceholder: {
//     width: 120,
//     height: 120,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#e0e0e0',
//     borderStyle: 'dashed',
//   },
//   logoText: {
//     color: '#ccc',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   titleContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   appTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   appTitleOrange: {
//     color: '#FF6B47',
//   },
//   appTitleBlack: {
//     color: '#000',
//   },
//   formContainer: {
//     flex: 1,
//   },
//   inputContainer: {
//     marginBottom: 16,
//     position: 'relative',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   passwordInput: {
//     paddingRight: 50,
//   },
//   eyeButton: {
//     position: 'absolute',
//     right: 16,
//     top: 18,
//   },
//   forgotPasswordButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 24,
//   },
//   forgotPasswordText: {
//     color: '#4A90E2',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   mainButton: {
//     backgroundColor: '#FF6B47',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   mainButtonDisabled: {
//     opacity: 0.7,
//   },
//   mainButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E5E5E5',
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     color: '#999',
//     fontSize: 14,
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 16,
//     marginBottom: 32,
//   },
//   socialButton: {
//     width: 56,
//     height: 56,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4285F4',
//   },
//   appleButton: {
//     backgroundColor: '#000',
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   toggleText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   toggleButtonText: {
//     color: '#FF6B47',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default AuthScreen;