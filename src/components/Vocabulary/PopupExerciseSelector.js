import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Animated,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Calcul de la hauteur réelle disponible pour Android
const getAvailableHeight = () => {
  if (Platform.OS === 'android') {
    // Soustraire la hauteur de la StatusBar sur Android
    const statusBarHeight = StatusBar.currentHeight || 0;
    return windowHeight - statusBarHeight;
  }
  return windowHeight;
};

const PopupExerciseSelector = ({ 
  visible, 
  levelInfo, 
  availableExercises, 
  onSelectExercise, 
  onSelectIndex,
  onCancel,
  userNativeLanguage = "FR",
  initialExerciseIndex = 0
}) => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));


  // Dans PopupExerciseSelector.js, AJOUTEZ ces logs au début du useEffect :

useEffect(() => {
  console.log("🎯 PopupExerciseSelector useEffect triggered:");
  console.log("visible:", visible);
  console.log("initialExerciseIndex:", initialExerciseIndex);
  console.log("availableExercises.length:", availableExercises.length);
  
  if (visible) {
    // Initialiser avec l'index fourni
    let startIndex = initialExerciseIndex;
    
    console.log("📍 Initial startIndex:", startIndex);
    
    // Vérifier que l'index est valide
    if (startIndex < 0 || startIndex >= availableExercises.length) {
      console.log("⚠️ Index invalide, reset à 0");
      startIndex = 0;
    }
    
    console.log("✅ Final startIndex:", startIndex);
    setSelectedExerciseIndex(startIndex);
    
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  } else {
    // Reset pour la prochaine ouverture
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
  }
}, [visible, initialExerciseIndex, availableExercises.length]);



  // Traductions pour l'interface
  const interfaceTranslations = {
    noExercisesAvailable: {
      "DE": "Keine Aufgaben vorhanden",
      "FR": "Aucun exercice disponible",
      "EN": "No exercises available",
      "ES": "No hay ejercicios disponibles",
      "PT": "Nenhum exercício disponível",
      "PL": "Brak dostępnych ćwiczeń",
      "RU": "Нет доступных упражнений",
      "TR": "Mevcut egzersiz yok",
      "IT": "Nessun esercizio disponibile",
      "UK": "Немає доступних вправ",
      "VI": "Không có bài tập nào",
      "TL": "Walang available na ehersisyo",
      "ZH": "没有可用的练习",
      "ID": "Tidak ada latihan tersedia",
      "TH": "ไม่มีแบบฝึกหัดที่พร้อมใช้งาน",
      "MS": "Tiada latihan tersedia",
      "AR": "لا توجد تمارين متاحة"
    },
    noExercisesForLevel: {
      "DE": "Für Level {level} sind noch keine Übungen verfügbar.",
      "FR": "Aucun exercice n'est encore disponible pour le niveau {level}.",
      "EN": "No exercises are available yet for level {level}.",
      "ES": "Aún no hay ejercicios disponibles para el nivel {level}.",
      "PT": "Ainda não há exercícios disponíveis para o nível {level}.",
      "PL": "Nie ma jeszcze ćwiczeń dostępnych dla poziomu {level}.",
      "RU": "Для уровня {level} пока нет доступных упражнений.",
      "TR": "Seviye {level} için henüz egzersiz mevcut değil.",
      "IT": "Non ci sono ancora esercizi disponibili per il livello {level}.",
      "UK": "Для рівня {level} ще немає доступних вправ.",
      "VI": "Chưa có bài tập nào cho cấp độ {level}.",
      "TL": "Wala pang available na ehersisyo para sa level {level}.",
      "ZH": "级别 {level} 还没有可用的练习。",
      "ID": "Belum ada latihan yang tersedia untuk level {level}.",
      "TH": "ยังไม่มีแบบฝึกหัดสำหรับระดับ {level}",
      "MS": "Belum ada latihan tersedia untuk tahap {level}.",
      "AR": "لا توجد تمارين متاحة حتى الآن للمستوى {level}."
    },
    continueWithExercise: {
      "DE": "Fortsetzen mit Übung:",
      "FR": "Continuer avec l'exercice :",
      "EN": "Continue with exercise:",
      "ES": "Continuar con el ejercicio:",
      "PT": "Continuar com o exercício:",
      "PL": "Kontynuuj z ćwiczeniem:",
      "RU": "Продолжить с упражнением:",
      "TR": "Egzersizle devam et:",
      "IT": "Continua con l'esercizio:",
      "UK": "Продовжити з вправою:",
      "VI": "Tiếp tục với bài tập:",
      "TL": "Magpatuloy sa ehersisyo:",
      "ZH": "继续练习：",
      "ID": "Lanjutkan dengan latihan:",
      "TH": "ดำเนินต่อด้วยแบบฝึกหัด:",
      "MS": "Teruskan dengan latihan:",
      "AR": "متابعة التمرين:"
    },
    lastResult: {
      "DE": "Letztes Ergebnis: {result}%",
      "FR": "Dernier résultat : {result}%",
      "EN": "Last result: {result}%",
      "ES": "Último resultado: {result}%",
      "PT": "Último resultado: {result}%",
      "PL": "Ostatni wynik: {result}%",
      "RU": "Последний результат: {result}%",
      "TR": "Son sonuç: {result}%",
      "IT": "Ultimo risultato: {result}%",
      "UK": "Останній результат: {result}%",
      "VI": "Kết quả cuối: {result}%",
      "TL": "Huling resulta: {result}%",
      "ZH": "最后结果：{result}%",
      "ID": "Hasil terakhir: {result}%",
      "TH": "ผลลัพธ์ล่าสุด: {result}%",
      "MS": "Keputusan terakhir: {result}%",
      "AR": "النتيجة الأخيرة: {result}%"
    },
    no: {
      "DE": "Nein",
      "FR": "Non",
      "EN": "No",
      "ES": "No",
      "PT": "Não",
      "PL": "Nie",
      "RU": "Нет",
      "TR": "Hayır",
      "IT": "No",
      "UK": "Ні",
      "VI": "Không",
      "TL": "Hindi",
      "ZH": "否",
      "ID": "Tidak",
      "TH": "ไม่",
      "MS": "Tidak",
      "AR": "لا"
    },
    yes: {
      "DE": "Ja",
      "FR": "Oui",
      "EN": "Yes",
      "ES": "Sí",
      "PT": "Sim",
      "PL": "Tak",
      "RU": "Да",
      "TR": "Evet",
      "IT": "Sì",
      "UK": "Так",
      "VI": "Có",
      "TL": "Oo",
      "ZH": "是",
      "ID": "Ya",
      "TH": "ใช่",
      "MS": "Ya",
      "AR": "نعم"
    }
  };

  useEffect(() => {
    if (visible) {
      // MODIFICATION : Initialiser avec l'index fourni
      let startIndex = initialExerciseIndex;
      
      // Vérifier que l'index est valide
      if (startIndex < 0 || startIndex >= availableExercises.length) {
        startIndex = 0;
      }
      
      setSelectedExerciseIndex(startIndex);
      
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Reset pour la prochaine ouverture
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible, initialExerciseIndex, availableExercises.length]); // MODIFIER les dépendances

  // Si aucun exercice disponible
  if (visible && availableExercises.length === 0) {
    // Auto-fermeture après 3 secondes
    setTimeout(() => {
      onCancel();
    }, 3000);

    return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="none"
        onRequestClose={onCancel}
        statusBarTranslucent={Platform.OS === 'android'}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <Animated.View style={[
              styles.popup, 
              styles.emptyPopup,
              { transform: [{ scale: scaleAnim }] }
            ]}>
              <View style={styles.emptyContent}>
                <Ionicons name="information-circle" size={48} color={colors.warning} />
                <Text style={styles.emptyTitle}>
                  {interfaceTranslations.noExercisesAvailable[userNativeLanguage]}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {interfaceTranslations.noExercisesForLevel[userNativeLanguage]?.replace('{level}', levelInfo?.id || '')}
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  const goToPrevious = () => {
    if (selectedExerciseIndex > 0) {
      setSelectedExerciseIndex(selectedExerciseIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedExerciseIndex < availableExercises.length - 1) {
      setSelectedExerciseIndex(selectedExerciseIndex + 1);
    }
  };

  const handleConfirm = () => {
    const selectedExercise = availableExercises[selectedExerciseIndex];
    onSelectExercise(selectedExercise);
    onSelectIndex(selectedExerciseIndex)
    console.log("Exercice choisit : ",selectedExerciseIndex)
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onCancel}
      statusBarTranslucent={Platform.OS === 'android'}
    >
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Animated.View style={[
            styles.popup,
            { transform: [{ scale: scaleAnim }] }
          ]}>
            {/* Content */}
            <View style={styles.content}>
              {/* Texte d'instruction */}
              <Text style={styles.instructionText}>
                {interfaceTranslations.continueWithExercise[userNativeLanguage]}
              </Text>

              {/* Sélecteur d'exercice */}
              <View style={styles.exerciseSelector}>
                <TouchableOpacity 
                  onPress={goToPrevious}
                  disabled={selectedExerciseIndex === 0}
                  style={[
                    styles.navButton,
                    selectedExerciseIndex === 0 && styles.navButtonDisabled
                  ]}
                >
                  <Ionicons 
                    name="chevron-back" 
                    size={24} 
                    color={selectedExerciseIndex === 0 ? colors.lightGray : "black"} 
                  />
                </TouchableOpacity>

                <View style={[styles.exerciseNumber, { borderWidth: 0 }]}>
                  <Text style={[styles.exerciseNumberText, { color: "black" }]}>
                    {selectedExerciseIndex + 1}
                  </Text>
                </View>

                <TouchableOpacity 
                  onPress={goToNext}
                  disabled={selectedExerciseIndex === availableExercises.length - 1}
                  style={[
                    styles.navButton,
                    selectedExerciseIndex === availableExercises.length - 1 && styles.navButtonDisabled
                  ]}
                >
                  <Ionicons 
                    name="chevron-forward" 
                    size={24} 
                    color={selectedExerciseIndex === availableExercises.length - 1 ? colors.lightGray : "black"} 
                  />
                </TouchableOpacity>
              </View>

              {/* Informations sur l'exercice sélectionné */}
              <View style={styles.exerciseInfo}>
                {availableExercises[selectedExerciseIndex]?.lastResult > 0 && (
                  <Text style={styles.lastResultText}>
                    {interfaceTranslations.lastResult[userNativeLanguage]?.replace('{result}', availableExercises[selectedExerciseIndex].lastResult)}
                  </Text>
                )}
              </View>
            </View>

            {/* Boutons d'action */}
            <View style={styles.actions}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>
                  {interfaceTranslations.no[userNativeLanguage]}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.confirmButton, { backgroundColor: 'black' }]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>
                  {interfaceTranslations.yes[userNativeLanguage]}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // Ajuster la hauteur selon la plateforme
    height: Platform.OS === 'android' ? getAvailableHeight() : windowHeight,
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
  popup: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    // Assurer que le popup ne dépasse pas l'écran
    maxHeight: '80%',
  },
  emptyPopup: {
    padding: 30,
    alignItems: 'center',
  },
  header: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 5
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  exerciseSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  navButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  navButtonDisabled: {
    opacity: 0,
  },
  exerciseNumber: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  exerciseNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exerciseInfo: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  exerciseInfoText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  lastResultText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    gap: 12,
    margin:10
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  confirmButton: {
    // backgroundColor sera définie dynamiquement
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  // Styles pour l'état vide
  emptyContent: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PopupExerciseSelector;