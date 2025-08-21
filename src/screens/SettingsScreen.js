import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import AuthScreen from './AuthScreen';
import AuthService from '../services/AuthService';
import CustomAlert from '../components/common/CustomAlert';

const colors = {
  primary: '#FF6B47',
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: '#1C1C1E',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  danger: '#FF3B30',
};

const SettingsScreen = ({ navigation }) => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    type: 'default'
  });

  const showCustomAlert = (title, message, buttons, type = 'default') => {
    setAlertConfig({
      visible: true,
      title,
      message,
      buttons,
      type
    });
  };
  
  const hideCustomAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };
  // Fonction de déconnexion
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        console.log('Déconnexion réussie');
        return true;
      } else {
        showCustomAlert(
          'Erreur',
          'Erreur lors de la déconnexion',
          [{ text: 'OK', style: 'default' }],
          'danger'
        );
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      showCustomAlert(
        'Erreur',
        'Erreur lors de la déconnexion',
        [{ text: 'OK', style: 'default' }],
        'danger'
      );
      return false;
    }
  };


  // Fonction de déconnexion avec confirmation
  const handleSignOutWithConfirmation = () => {
    showCustomAlert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            const success = await handleSignOut();
            if (success) {
              showCustomAlert(
                'Succès',
                'Vous avez été déconnecté',
                [{ text: 'OK', style: 'default' }],
                'success'
              );
            }
          }
        }
      ],
      'warning'
    );
  };

  // MODIFICATION : Fonction de suppression de compte avec déconnexion automatique
  const handleDeleteAccount = () => {
    showCustomAlert(
      'Supprimer le compte',
      'Attention ! Cette action est irréversible. Toutes vos données seront perdues.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            // Fermer l'alerte actuelle avant d'en ouvrir une nouvelle
            setTimeout(() => {
              showCustomAlert(
                'Confirmation finale',
                'Êtes-vous absolument certain de vouloir supprimer votre compte ?',
                [
                  { text: 'Annuler', style: 'cancel' },
                  {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                      // Fermer l'alerte et traiter la suppression
                      hideCustomAlert();
                      setTimeout(() => {
                        handleAccountDeletion();
                      }, 300);
                    }
                  }
                ]
              );
            }, 300);
          }
        }
      ]
    );
  };

  const handleAccountDeletion = async () => {
    try {
      console.log('Tentative de suppression du compte...');
      const result = await AuthService.deleteAccount();
      console.log('Résultat de la suppression:', result);
      
      if (result.success) {
        showCustomAlert(
          'Succès',
          'Votre compte a été supprimé',
          [{ text: 'OK', style: 'default' }],
          'success'
        );
      } else {
        // CORRECTION : Gestion élargie des erreurs d'authentification
        const isAuthError = result.error === 'Veuillez vous reconnecter avant de supprimer votre compte' || 
                           result.error === 'Aucun utilisateur connecté' ||
                           result.error.includes('auth/requires-recent-login');
  
        if (isAuthError) {
          showCustomAlert(
            'Ré-authentification requise',
            'Pour des raisons de sécurité, vous devez vous reconnecter récemment pour supprimer votre compte. Vous allez être déconnecté automatiquement.',
            [
              {
                text: 'OK', 
                onPress: () => {
                  hideCustomAlert();
                  setTimeout(async () => {
                    console.log('Déconnexion automatique en cours...');
                    const signOutSuccess = await handleSignOut();
                    
                    if (signOutSuccess) {
                      setTimeout(() => {
                        showCustomAlert(
                          'Reconnectez-vous',
                          'Veuillez vous reconnecter puis réessayer de supprimer votre compte immédiatement après la connexion.',
                          [
                            {
                              text: 'Se connecter',
                              style: 'default',
                              onPress: () => {
                                hideCustomAlert();
                                setTimeout(() => {
                                  setShowAuthModal(true);
                                }, 300);
                              }
                            }
                          ],
                          'default'
                        );
                      }, 500);
                    }
                  }, 300);
                }
              }
            ],
            'warning'
          );
        } else {
          // Autres erreurs
          showCustomAlert(
            'Erreur',
            result.error,
            [{ text: 'OK', style: 'default' }],
            'danger'
          );
        }
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      showCustomAlert(
        'Erreur',
        'Une erreur inattendue s\'est produite',
        [{ text: 'OK', style: 'default' }],
        'danger'
      );
    }
  };

  // Fonction pour ouvrir l'écran d'authentification
  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  // Menu dynamique selon l'état d'authentification
  const getMenuItems = () => {
    const baseItems = [
      {
        title: 'Get Pro',
        subtitle: 'Get Higher Score!',
        icon: 'star',
        hasUpgrade: true,
        action: () => console.log('Get Pro'),
      },
      {
        title: 'Feedback & Support',
        icon: 'chatbubble-outline',
        action: () => console.log('Feedback'),
      },
      {
        title: 'Share Application',
        icon: 'share-outline',
        action: () => console.log('Share'),
      },
      {
        title: 'Privacy Policy',
        icon: 'shield-outline',
        action: () => console.log('Privacy'),
      },
      {
        title: 'Terms and Conditions',
        icon: 'document-text-outline',
        action: () => console.log('Terms'),
      },
    ];

    if (isAuthenticated) {
      baseItems.push(
        {
          title: 'Sign Out',
          icon: 'log-out-outline',
          action: handleSignOutWithConfirmation,
          textColor: colors.primary,
        },
        {
          title: 'Delete Account',
          icon: 'trash-outline',
          action: handleDeleteAccount,
          textColor: colors.danger,
        }
      );
    } else {
      baseItems.push({
        title: 'Sign In',
        icon: 'log-in-outline',
        action: handleSignIn,
        textColor: colors.primary,
      });
    }

    return baseItems;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color={colors.gray} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>Profile</Text>
            {isAuthenticated && user ? (
              <View style={styles.userInfo}>
                <Text style={styles.userEmail}>{user.email}</Text>
                {user.displayName && (
                  <Text style={styles.userName}>{user.displayName}</Text>
                )}
              </View>
            ) : (
              <Text style={styles.notSignedIn}>Not signed in</Text>
            )}
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {getMenuItems().map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.action}
          >
            <View style={styles.menuContent}>
              <Ionicons 
                name={item.icon} 
                size={20} 
                color={item.textColor || colors.gray} 
              />
              <View style={styles.menuText}>
                <Text style={[
                  styles.menuTitle,
                  item.textColor && { color: item.textColor }
                ]}>
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                )}
              </View>
            </View>
            {item.hasUpgrade && (
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>UPGRADE</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.version}>
          <Text style={styles.versionText}>App version: 3.1.8(+2025061216)</Text>
        </View>
      </ScrollView>

      {/* Modal d'authentification */}
      <Modal
        visible={showAuthModal}
        animationType="slide"
        {...(Platform.OS === 'ios' 
          ? { presentationStyle: 'pageSheet' }
          : { 
              presentationStyle: 'fullScreen',
              statusBarTranslucent: true 
            }
        )}
      >
        <AuthScreen 
          navigation={navigation}
          onClose={() => setShowAuthModal(false)}
        />
      </Modal>
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        type={alertConfig.type}
        onClose={hideCustomAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  userInfo: {
    marginTop: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray,
  },
  userName: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  notSignedIn: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    marginLeft: 16,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  version: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: colors.gray,
  },
});

export default SettingsScreen;