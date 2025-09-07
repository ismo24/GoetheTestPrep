// VocabularyScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelSelectionView from '../components/Vocabulary/LevelSelectionView';
import PopupExerciseSelector from '../components/Vocabulary/PopupExerciseSelector';
import ExerciseModal from '../components/Vocabulary/ExerciseModal';
import { useUserData } from '../context/AppDataContext';
import { useExerciseData } from '../hooks/useExerciseData';
import { useSyncData } from '../hooks/useSyncData';
import { colors } from '../styles/colors';
import { AuthProvider,useAuth } from '../hooks/useAuth'; 
import AuthScreen from './AuthScreen';

const VocabularyScreen = ({ navigation }) => {
  
  const { isAuthenticated, loading } = useAuth();
  const { userData } = useUserData();
  const { 
    getExercisesForLevel, 
    saveCurrentAnswers, 
    getCurrentAnswers, 
    getLevelStats, 
    finishExerciseWithSync,
    handleVocabularyReveal // NOUVEAU: Import de la fonction de révélation
  } = useExerciseData();
  const { syncNow, isSyncing } = useSyncData();
  const userNativeLanguage = userData.nativeLanguage || "FR";

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [actualIndex, setActualIndex] = useState();
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [exerciseResults, setExerciseResults] = useState(null);
  const [initialExerciseIndex, setInitialExerciseIndex] = useState(0);

  // Traductions pour les titres de niveaux (code existant...)
  const levelTitles = {
    anfanger: {
      "DE": "Anfänger",
      "FR": "Débutant",
      "EN": "Beginner",
      "ES": "Principiante",
      "PT": "Iniciante",
      "PL": "Początkujący",
      "RU": "Начинающий",
      "TR": "Başlangıç",
      "IT": "Principiante",
      "UK": "Початківець",
      "VI": "Người mới bắt đầu",
      "TL": "Nagsisimula",
      "ZH": "初学者",
      "ID": "Pemula",
      "TH": "ผู้เริ่มต้น",
      "MS": "Pemula",
      "AR": "مبتدئ"
    },
    grundlegend: {
      "DE": "Grundlegend",
      "FR": "Élémentaire",
      "EN": "Elementary",
      "ES": "Elemental",
      "PT": "Elementar",
      "PL": "Podstawowy",
      "RU": "Элементарный",
      "TR": "Temel",
      "IT": "Elementare",
      "UK": "Елементарний",
      "VI": "Cơ bản",
      "TL": "Pangunahing",
      "ZH": "基础",
      "ID": "Dasar",
      "TH": "ขั้นพื้นฐาน",
      "MS": "Asas",
      "AR": "أساسي"
    },
    mittelstufe: {
      "DE": "Mittelstufe",
      "FR": "Intermédiaire",
      "EN": "Intermediate",
      "ES": "Intermedio",
      "PT": "Intermediário",
      "PL": "Średnio zaawansowany",
      "RU": "Средний",
      "TR": "Orta seviye",
      "IT": "Intermedio",
      "UK": "Середній",
      "VI": "Trung cấp",
      "TL": "Katamtaman",
      "ZH": "中级",
      "ID": "Menengah",
      "TH": "ระดับกลาง",
      "MS": "Pertengahan",
      "AR": "متوسط"
    },
    fortgeschritten: {
      "DE": "Fortgeschritten",
      "FR": "Avancé",
      "EN": "Advanced",
      "ES": "Avanzado",
      "PT": "Avançado",
      "PL": "Zaawansowany",
      "RU": "Продвинутый",
      "TR": "İleri seviye",
      "IT": "Avanzato",
      "UK": "Просунутий",
      "VI": "Nâng cao",
      "TL": "Mataas na antas",
      "ZH": "高级",
      "ID": "Lanjutan",
      "TH": "ระดับสูง",
      "MS": "Lanjutan",
      "AR": "متقدم"
    },
    kompetent: {
      "DE": "Kompetent",
      "FR": "Compétent",
      "EN": "Competent",
      "ES": "Competente",
      "PT": "Competente",
      "PL": "Kompetentny",
      "RU": "Компетентный",
      "TR": "Yetkin",
      "IT": "Competente",
      "UK": "Компетентний",
      "VI": "Thành thạo",
      "TL": "Dalubhasa",
      "ZH": "熟练",
      "ID": "Kompeten",
      "TH": "ชำนาญ",
      "MS": "Cekap",
      "AR": "كفء"
    },
    meister: {
      "DE": "Meister",
      "FR": "Maître",
      "EN": "Master",
      "ES": "Maestro",
      "PT": "Mestre",
      "PL": "Mistrz",
      "RU": "Мастер",
      "TR": "Usta",
      "IT": "Maestro",
      "UK": "Майстер",
      "VI": "Bậc thầy",
      "TL": "Dalubhasa",
      "ZH": "大师",
      "ID": "Ahli",
      "TH": "ผู้เชี่ยวชาญ",
      "MS": "Pakar",
      "AR": "خبير"
    }
  };

  // Traductions pour les sous-titres (code existant...)
  const levelSubtitles = {
    grundlegendesLesen: {
      "DE": "Grundlegendes Wortschatz",
      "FR": "Vocabulaire de base",
      "EN": "Basic vocabulary",
      "ES": "Vocabulario básico",
      "PT": "Vocabulário básico",
      "PL": "Podstawowe słownictwo",
      "RU": "Базовая лексика",
      "TR": "Temel kelime hazinesi",
      "IT": "Vocabolario di base",
      "UK": "Базова лексика",
      "VI": "Từ vựng cơ bản",
      "TL": "Pangunahing bokabularyo",
      "ZH": "基础词汇",
      "ID": "Kosakata dasar",
      "TH": "คำศัพท์พื้นฐาน",
      "MS": "Kosa kata asas",
      "AR": "المفردات الأساسية"
    },
    einfacheTexte: {
      "DE": "Alltägliche Wörter",
      "FR": "Mots du quotidien",
      "EN": "Everyday words",
      "ES": "Palabras cotidianas",
      "PT": "Palavras do dia a dia",
      "PL": "Codzienne słowa",
      "RU": "Повседневные слова",
      "TR": "Günlük kelimeler",
      "IT": "Parole quotidiane",
      "UK": "Повсякденні слова",
      "VI": "Từ ngữ hàng ngày",
      "TL": "Araw-araw na salita",
      "ZH": "日常用词",
      "ID": "Kata-kata sehari-hari",
      "TH": "คำในชีวิตประจำวัน",
      "MS": "Perkataan harian",
      "AR": "الكلمات اليومية"
    },
    alltaglicheTexte: {
      "DE": "Mittlere Vokabeln",
      "FR": "Vocabulaire intermédiaire",
      "EN": "Intermediate vocabulary",
      "ES": "Vocabulario intermedio",
      "PT": "Vocabulário intermediário",
      "PL": "Słownictwo średnio zaawansowane",
      "RU": "Средняя лексика",
      "TR": "Orta seviye kelime hazinesi",
      "IT": "Vocabolario intermedio",
      "UK": "Середня лексика",
      "VI": "Từ vựng trung cấp",
      "TL": "Katamtamang bokabularyo",
      "ZH": "中级词汇",
      "ID": "Kosakata menengah",
      "TH": "คำศัพท์ระดับกลาง",
      "MS": "Kosa kata pertengahan",
      "AR": "المفردات المتوسطة"
    },
    komplexeTexte: {
      "DE": "Erweiterte Vokabeln",
      "FR": "Vocabulaire avancé",
      "EN": "Advanced vocabulary",
      "ES": "Vocabulario avanzado",
      "PT": "Vocabulário avançado",
      "PL": "Zaawansowane słownictwo",
      "RU": "Продвинутая лексика",
      "TR": "İleri seviye kelime hazinesi",
      "IT": "Vocabolario avanzato",
      "UK": "Просунута лексика",
      "VI": "Từ vựng nâng cao",
      "TL": "Mataas na antas na bokabularyo",
      "ZH": "高级词汇",
      "ID": "Kosakata lanjutan",
      "TH": "คำศัพท์ระดับสูง",
      "MS": "Kosa kata lanjutan",
      "AR": "المفردات المتقدمة"
    },
    anspruchsvolleTexte: {
      "DE": "Spezialisierte Vokabeln",
      "FR": "Vocabulaire spécialisé",
      "EN": "Specialized vocabulary",
      "ES": "Vocabulario especializado",
      "PT": "Vocabulário especializado",
      "PL": "Specjalistyczne słownictwo",
      "RU": "Специализированная лексика",
      "TR": "Uzmanlaşmış kelime hazinesi",
      "IT": "Vocabolario specializzato",
      "UK": "Спеціалізована лексика",
      "VI": "Từ vựng chuyên môn",
      "TL": "Espesyalisadong bokabularyo",
      "ZH": "专业词汇",
      "ID": "Kosakata khusus",
      "TH": "คำศัพท์เฉพาะทาง",
      "MS": "Kosa kata khusus",
      "AR": "المفردات المتخصصة"
    },
    muttersprachlichesLesen: {
      "DE": "Muttersprachliche Vokabeln",
      "FR": "Vocabulaire de niveau natif",
      "EN": "Native-level vocabulary",
      "ES": "Vocabulario de nivel nativo",
      "PT": "Vocabulário de nível nativo",
      "PL": "Słownictwo na poziomie natywnym",
      "RU": "Лексика на родном уровне",
      "TR": "Ana dil düzeyinde kelime hazinesi",
      "IT": "Vocabolario di livello madrelingua",
      "UK": "Лексика на рідному рівні",
      "VI": "Từ vựng mức độ bản ngữ",
      "TL": "Katutubong antas na bokabularyo",
      "ZH": "母语水平词汇",
      "ID": "Kosakata tingkat native",
      "TH": "คำศัพท์ระดับเจ้าของภาษา",
      "MS": "Kosa kata peringkat ibunda",
      "AR": "مفردات مستوى اللغة الأم"
    }
  };

  const levels = [
    {
      id: 'A1',
      title: levelTitles.anfanger[userNativeLanguage],
      subtitle: levelSubtitles.grundlegendesLesen[userNativeLanguage],
      color: colors.success,
      icon: 'leaf',
      image: require('../../assets/images/start.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'A2',
      title: levelTitles.grundlegend[userNativeLanguage],
      subtitle: levelSubtitles.einfacheTexte[userNativeLanguage],
      color: colors.secondary,
      icon: 'flower',
      image: require('../../assets/images/basics.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'B1',
      title: levelTitles.mittelstufe[userNativeLanguage],
      subtitle: levelSubtitles.alltaglicheTexte[userNativeLanguage],
      color: colors.warning,
      icon: 'star',
      image: require('../../assets/images/engrenage.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'B2',
      title: levelTitles.fortgeschritten[userNativeLanguage],
      subtitle: levelSubtitles.komplexeTexte[userNativeLanguage],
      color: colors.primary,
      icon: 'trophy',
      image: require('../../assets/images/rocket.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'C1',
      title: levelTitles.kompetent[userNativeLanguage],
      subtitle: levelSubtitles.anspruchsvolleTexte[userNativeLanguage],
      color: '#E91E63',
      icon: 'diamond',
      image: require('../../assets/images/diploma.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'C2',
      title: levelTitles.meister[userNativeLanguage],
      subtitle: levelSubtitles.muttersprachlichesLesen[userNativeLanguage],
      color: '#9C27B0',
      icon: 'crown',
      image: require('../../assets/images/trophy.png'), 
      imageSize: { width: 100, height: 100 },
      imageOffset: { x: 20, y: 20 }
    }
  ];

  // Fonction pour récupérer le dernier index d'exercice
  // Si le problème persiste, utilisez cette version alternative dans VocabularyScreen :

const getLastExerciseIndex = (levelId) => {
  try {
    const levelData = userData.data?.vokabeln?.[levelId];
    
    // Cas 1: Si pas de données du tout
    if (!levelData) {
      console.log("Pas de données pour", levelId, "-> index 0");
      return 0;
    }
    
    // Cas 2: Si l'index existe dans les données utilisateur
    if (typeof levelData.index === 'number' && levelData.index >= 0) {
      const exercises = getExercisesForLevel('vokabeln', levelId);
      
      // Vérifier que l'index est dans la plage valide
      if (levelData.index < exercises.length) {
        console.log("Index valide trouvé:", levelData.index);
        return levelData.index;
      } else {
        console.log("Index trop grand, ajustement:", exercises.length - 1);
        return Math.max(0, exercises.length - 1);
      }
    }
    
    // Cas 3: Essayer de calculer l'index basé sur les exercices complétés
    if (levelData.data && Object.keys(levelData.data).length > 0) {
      const completedCount = Object.values(levelData.data)
        .filter(exerciseData => exerciseData.lastNote !== undefined).length;
      
      console.log("Calcul basé sur exercices complétés:", completedCount);
      return Math.max(0, completedCount);
    }
    
    // Par défaut
    console.log("Retour par défaut: index 0");
    return 0;
    
  } catch (error) {
    console.error("Erreur dans getLastExerciseIndex:", error);
    return 0;
  }
};
  // Gestionnaires d'événements
  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    const exercises = getExercisesForLevel('vokabeln', levelId); 
    setAvailableExercises(exercises);
  
    const lastIndex = getLastExerciseIndex(levelId);
    setActualIndex(lastIndex)

    // DEBUG: Ajoutez ces logs pour comprendre ce qui se passe
    console.log("=== DEBUG VOCABULARY INDEX ===");
    console.log("Level ID:", levelId);
    console.log("Exercises count:", exercises.length);
    console.log("User data for level:", userData.data?.vokabeln?.[levelId]);
    console.log("Calculated last index:", lastIndex);
    console.log("Learning list:", userData.data?.vokabeln?.[levelId]?.learning);
    console.log("Current index in userData:", userData.data?.vokabeln?.[levelId]?.index);
    console.log("===============================");
    
    setInitialExerciseIndex(lastIndex);
    setShowExerciseSelector(true);
  };

  const handleSelectIndex=(value) => {
    setActualIndex(value)
    console.log("Yeah Value :",value)
  }

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseSelector(false);
    setShowExerciseModal(true);
    setShowResults(false);
    
    const existingAnswers = getCurrentAnswers(exercise.id);
    setSelectedAnswers(existingAnswers);
    setExerciseResults(null);
    console.log("exercice select :", exercise);
  };

  const handleSelectAnswer = (questionIndex, optionId) => {
    const currentAnswers = getCurrentAnswers(selectedExercise?.id);
    const updatedAnswers = {
      ...currentAnswers,
      [questionIndex]: optionId
    };
    
    setSelectedAnswers(updatedAnswers);
    saveCurrentAnswers(selectedExercise.id, updatedAnswers);
  };

  // NOUVEAU: Gestionnaire pour la révélation des mots
  const handleRevealWord = async (exerciseId, levelId,value) => {
    try {
      await handleVocabularyReveal(exerciseId, levelId,value,actualIndex);
      
      // Recharger la liste des exercices pour refléter les changements
      const updatedExercises = getExercisesForLevel('vokabeln', levelId);
      setAvailableExercises(updatedExercises);
      handleFinishExercise()
      console.log(`✅ Révélation du mot ${exerciseId} traitée avec succès`);
    } catch (error) {
      console.error('Erreur lors de la révélation du mot:', error);
    }
  };

  const handleFinishExercise = async () => {
    const results = {
      totalQuestions: 1,
      correctAnswers: 1,
      wrongAnswers: 0,
      percentage: 95,
      detailedResults: [{
        textIndex: 1,
        questions: []
      }]
    };
    
    setExerciseResults(results);
    setShowResults(true);
    
    await finishExerciseWithSync('vokabeln', selectedLevel, selectedExercise.id, results,actualIndex);
  };

  const handleRestartExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setExerciseResults(null);
  };


  

  const handleNextExercise = () => {
    
    
    console.log("lastIndex",actualIndex)
    console.log("availableExercises",availableExercises.length)

    if (actualIndex < availableExercises.length - 1) {
      const nextExercise = availableExercises[actualIndex + 1];
      setActualIndex(actualIndex+ 1)
      setSelectedExercise(nextExercise);
      setSelectedAnswers({});
      setShowResults(false);
      setExerciseResults(null);
    }
  };

  const handleCloseModal = () => {
    setShowExerciseModal(false);
    setSelectedExercise(null);
    setSelectedAnswers({});
    setShowResults(false);
    setExerciseResults(null);
  };

  const handleCloseSelectorPopup = () => {
    setShowExerciseSelector(false);
    setSelectedLevel(null);
    setAvailableExercises([]);
  };

  if(!isAuthenticated && initialExerciseIndex > 2){
    return(<AuthScreen unclosable={true} />)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <LevelSelectionView
        levels={levels}
        onBack={() => navigation.goBack()}
        onSelectLevel={handleLevelSelect}
 
        getUbungenForLevel={getExercisesForLevel}
        getLastExerciseIndex={getLastExerciseIndex}
        userNativeLanguage={userNativeLanguage}
      />

      <PopupExerciseSelector
        visible={showExerciseSelector}
        levelInfo={levels.find(l => l.id === selectedLevel)}
        availableExercises={availableExercises}
        onSelectExercise={handleExerciseSelect}
        onSelectIndex={handleSelectIndex}
        onCancel={handleCloseSelectorPopup}
        initialExerciseIndex={initialExerciseIndex}
      />

      <ExerciseModal
        visible={showExerciseModal}
        showResults={showResults}
        selectedExercise={selectedExercise}
        selectedAnswers={selectedAnswers}
        exerciseResults={exerciseResults}
        levelInfo={levels.find(l => l.id === selectedLevel)}
        availableExercises={availableExercises}
        onClose={handleCloseModal}
        onSelectAnswer={handleSelectAnswer}
        onFinishExercise={handleFinishExercise}
        onRestart={handleRestartExercise}
        onNextExercise={handleNextExercise}
        onRevealWord={handleRevealWord} // NOUVEAU: Passer le gestionnaire
        actualIndex={actualIndex}
      />
    </SafeAreaView>
  );
};

export default VocabularyScreen;