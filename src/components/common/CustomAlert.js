// components/common/CustomAlert.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const { width, height } = Dimensions.get('window');

// Calcul de la hauteur réelle disponible pour Android
const getAvailableHeight = () => {
  if (Platform.OS === 'android') {
    // Soustraire la hauteur de la StatusBar sur Android
    const statusBarHeight = StatusBar.currentHeight || 0;
    return height - statusBarHeight;
  }
  return height;
};

const CustomAlert = ({
  visible,
  title,
  message,
  buttons = [],
  onClose,
  type = 'default' // 'default', 'warning', 'danger', 'success'
}) => {
  // Couleurs selon le type d'alerte
  const getTypeColors = () => {
    switch (type) {
      case 'warning':
        return {
          iconColor: '#FF9500',
          iconName: 'warning-outline',
          titleColor: '#FF9500'
        };
      case 'danger':
        return {
          iconColor: '#FF3B30',
          iconName: 'alert-circle-outline',
          titleColor: '#FF3B30'
        };
      case 'success':
        return {
          iconColor: '#34C759',
          iconName: 'checkmark-circle-outline',
          titleColor: '#34C759'
        };
      default:
        return {
          iconColor: '#007AFF',
          iconName: 'information-circle-outline',
          titleColor: '#1C1C1E'
        };
    }
  };

  const typeColors = getTypeColors();

  const handleButtonPress = (button) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onClose) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={Platform.OS === 'android'}
    >
      <View style={styles.modalContainer}>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            {/* Icône */}
            {/* <View style={styles.iconContainer}>
              <Ionicons 
                name={typeColors.iconName} 
                size={40} 
                color={typeColors.iconColor} 
              />
            </View> */}

            {/* Titre */}
            <Text style={[styles.title, { color:colors.primary
                //   typeColors.titleColor 
                }]}>
              {title}
            </Text>

            {/* Message */}
            <Text style={styles.message}>
              {message}
            </Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
              {buttons.length === 1 ? (
                // Un seul bouton - pleine largeur
                <TouchableOpacity
                  style={[
                    styles.singleButton,
                    {
                      backgroundColor: 'black'
                    //   buttons[0].style === 'destructive' 
                    //     ? '#FF3B30' 
                    //     : buttons[0].style === 'cancel' 
                    //       ? '#F2F2F7'
                    //       : '#007AFF'
                    }
                  ]}
                  onPress={() => handleButtonPress(buttons[0])}
                >
                  <Text style={[
                    styles.buttonText,
                    {
                      color: buttons[0].style === 'cancel' ? '#1C1C1E' : '#FFFFFF'
                    }
                  ]}>
                    {buttons[0].text}
                  </Text>
                </TouchableOpacity>
              ) : (
                // Deux boutons - côte à côte
                <View style={styles.twoButtonsRow}>
                  {buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.halfButton,
                        {
                          backgroundColor: button.style === 'destructive' 
                            ? 'black' 
                            : button.style === 'cancel' 
                              ? '#F2F2F7'
                              : '#007AFF',
                          marginRight: index === 0 ? 8 : 0,
                          marginLeft: index === 1 ? 8 : 0
                        }
                      ]}
                      onPress={() => handleButtonPress(button)}
                    >
                      <Text style={[
                        styles.buttonText,
                        {
                          color: button.style === 'cancel' ? '#1C1C1E' : '#FFFFFF'
                        }
                      ]}>
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // Ajuster la hauteur selon la plateforme
    height: Platform.OS === 'android' ? getAvailableHeight() : height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Ajustements spécifiques pour Android
    ...(Platform.OS === 'android' && {
      paddingTop: StatusBar.currentHeight || 0,
      paddingBottom: 0,
    }),
  },
  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    // Assurer que l'alerte ne dépasse pas l'écran
    maxHeight: '80%',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonsContainer: {
    width: '100%',
  },
  singleButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoButtonsRow: {
    flexDirection: 'row',
    width: '100%',
  },
  halfButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
  },
});

export default CustomAlert;