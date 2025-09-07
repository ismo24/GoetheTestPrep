// HoerenScreen.js
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelSelectionView from '../components/hoeren/LevelSelectionView';
import PopupExerciseSelector from '../components/hoeren/PopupExerciseSelector';
import ExerciseModal from '../components/hoeren/ExerciseModal';
import { useUserData } from '../context/AppDataContext';
import { useExerciseData } from '../hooks/useExerciseData';
import { useSyncData } from '../hooks/useSyncData';
import { colors } from '../styles/colors';
// AJOUT : Import des composants d'authentification
import { AuthProvider,useAuth } from '../hooks/useAuth'; 
import AuthScreen from './AuthScreen';

const HoerenScreen = ({ navigation }) => {
  

  const { isAuthenticated, loading } = useAuth();
  const { userData } = useUserData();
  const { getExercisesForLevel, saveCurrentAnswers, getCurrentAnswers, getLevelStats, finishExerciseWithSync,
    
  } = useExerciseData();
  const { syncNow, isSyncing } = useSyncData();
  const userNativeLanguage = userData.nativeLanguage || "FR";


  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [exerciseResults, setExerciseResults] = useState(null);
  const [initialExerciseIndex, setInitialExerciseIndex] = useState(0);

  // Traductions pour les titres de niveaux
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

  // Traductions pour les sous-titres de niveaux (spécifiques à l'écoute)
  const levelSubtitles = {
    grundlegendesHoeren: {
      "DE": "Grundlegendes Hörverstehen",
      "FR": "Compréhension auditive de base",
      "EN": "Basic listening comprehension",
      "ES": "Comprensión auditiva básica",
      "PT": "Compreensão auditiva básica",
      "PL": "Podstawowe rozumienie słuchania",
      "RU": "Базовое понимание на слух",
      "TR": "Temel dinleme anlayışı",
      "IT": "Comprensione auditiva di base",
      "UK": "Базове розуміння на слух",
      "VI": "Hiểu nghe cơ bản",
      "TL": "Pangunahing pag-unawa sa pakikinig",
      "ZH": "基础听力理解",
      "ID": "Pemahaman mendengar dasar",
      "TH": "ความเข้าใจการฟังพื้นฐาน",
      "MS": "Kefahaman mendengar asas",
      "AR": "فهم الاستماع الأساسي"
    },
    einfacheAudios: {
      "DE": "Einfache Audios verstehen",
      "FR": "Comprendre des audios simples",
      "EN": "Understanding simple audios",
      "ES": "Entender audios simples",
      "PT": "Entender áudios simples",
      "PL": "Rozumienie prostych nagrań",
      "RU": "Понимание простых аудио",
      "TR": "Basit ses kayıtlarını anlama",
      "IT": "Comprendere audio semplici",
      "UK": "Розуміння простих аудіо",
      "VI": "Hiểu các audio đơn giản",
      "TL": "Pag-unawa sa mga simpleng audio",
      "ZH": "理解简单音频",
      "ID": "Memahami audio sederhana",
      "TH": "เข้าใจเสียงง่ายๆ",
      "MS": "Memahami audio mudah",
      "AR": "فهم الملفات الصوتية البسيطة"
    },
    alltaglicheGespraeche: {
      "DE": "Alltägliche Gespräche verstehen",
      "FR": "Comprendre des conversations quotidiennes",
      "EN": "Understanding everyday conversations",
      "ES": "Entender conversaciones cotidianas",
      "PT": "Entender conversas do cotidiano",
      "PL": "Rozumienie codziennych rozmów",
      "RU": "Понимание повседневных разговоров",
      "TR": "Günlük konuşmaları anlama",
      "IT": "Comprendere conversazioni quotidiane",
      "UK": "Розуміння повсякденних розмов",
      "VI": "Hiểu các cuộc hội thoại hàng ngày",
      "TL": "Pag-unawa sa mga araw-araw na usapan",
      "ZH": "理解日常对话",
      "ID": "Memahami percakapan sehari-hari",
      "TH": "เข้าใจการสนทนาในชีวิตประจำวัน",
      "MS": "Memahami perbualan harian",
      "AR": "فهم المحادثات اليومية"
    },
    komplexeAudios: {
      "DE": "Komplexe Audios verstehen",
      "FR": "Comprendre des audios complexes",
      "EN": "Understanding complex audios",
      "ES": "Entender audios complejos",
      "PT": "Entender áudios complexos",
      "PL": "Rozumienie złożonych nagrań",
      "RU": "Понимание сложных аудио",
      "TR": "Karmaşık ses kayıtlarını anlama",
      "IT": "Comprendere audio complessi",
      "UK": "Розуміння складних аудіо",
      "VI": "Hiểu các audio phức tạp",
      "TL": "Pag-unawa sa mga kumplikadong audio",
      "ZH": "理解复杂音频",
      "ID": "Memahami audio kompleks",
      "TH": "เข้าใจเสียงที่ซับซ้อน",
      "MS": "Memahami audio kompleks",
      "AR": "فهم الملفات الصوتية المعقدة"
    },
    anspruchsvolleAudios: {
      "DE": "Anspruchsvolle Audios verstehen",
      "FR": "Comprendre des audios exigeants",
      "EN": "Understanding demanding audios",
      "ES": "Entender audios exigentes",
      "PT": "Entender áudios exigentes",
      "PL": "Rozumienie wymagających nagrań",
      "RU": "Понимание требовательных аудио",
      "TR": "Zorlu ses kayıtlarını anlama",
      "IT": "Comprendere audio impegnativi",
      "UK": "Розуміння вимогливих аудіо",
      "VI": "Hiểu các audio khó khăn",
      "TL": "Pag-unawa sa mga mahirap na audio",
      "ZH": "理解要求很高的音频",
      "ID": "Memahami audio yang menantang",
      "TH": "เข้าใจเสียงที่ท้าทาย",
      "MS": "Memahami audio yang mencabar",
      "AR": "فهم الملفات الصوتية المتطلبة"
    },
    muttersprachlichesHoeren: {
      "DE": "Muttersprachliches Hörverstehen",
      "FR": "Compréhension auditive native",
      "EN": "Native-level listening comprehension",
      "ES": "Comprensión auditiva nativa",
      "PT": "Compreensão auditiva nativa",
      "PL": "Natywne rozumienie słuchania",
      "RU": "Родное понимание на слух",
      "TR": "Ana dil düzeyinde dinleme anlayışı",
      "IT": "Comprensione auditiva madrelingua",
      "UK": "Рідне розуміння на слух",
      "VI": "Hiểu nghe ở mức độ bản ngữ",
      "TL": "Katutubong antas ng pag-unawa sa pakikinig",
      "ZH": "母语水平听力理解",
      "ID": "Pemahaman mendengar tingkat native",
      "TH": "ความเข้าใจการฟังระดับเจ้าของภาษา",
      "MS": "Kefahaman mendengar peringkat ibunda",
      "AR": "فهم الاستماع على مستوى اللغة الأم"
    }
  };

  // Traductions pour l'exercice d'écoute
  const exerciseTranslations = {
    "DE": "Hörübung",
    "FR": "Exercice d'écoute",
    "EN": "Listening Exercise",
    "ES": "Ejercicio de escucha",
    "PT": "Exercício de audição",
    "PL": "Ćwiczenie słuchania",
    "RU": "Упражнение на слух",
    "TR": "Dinleme egzersizi",
    "IT": "Esercizio di ascolto",
    "UK": "Вправа на слух",
    "VI": "Bài tập nghe",
    "TL": "Ehersisyo sa pakikinig",
    "ZH": "听力练习",
    "ID": "Latihan mendengar",
    "TH": "แบบฝึกหัดการฟัง",
    "MS": "Latihan mendengar",
    "AR": "تمرين الاستماع"
  };

  const levels = [
    {
      id: 'A1',
      title: levelTitles.anfanger[userNativeLanguage],
      subtitle: levelSubtitles.grundlegendesHoeren[userNativeLanguage],
      color: colors.success,
      icon: 'leaf',
      image: require('../../assets/images/start.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'A2',
      title: levelTitles.grundlegend[userNativeLanguage],
      subtitle: levelSubtitles.einfacheAudios[userNativeLanguage],
      color: colors.secondary,
      icon: 'flower',
      image: require('../../assets/images/basics.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'B1',
      title: levelTitles.mittelstufe[userNativeLanguage],
      subtitle: levelSubtitles.alltaglicheGespraeche[userNativeLanguage],
      color: colors.warning,
      icon: 'star',
      image: require('../../assets/images/engrenage.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'B2',
      title: levelTitles.fortgeschritten[userNativeLanguage],
      subtitle: levelSubtitles.komplexeAudios[userNativeLanguage],
      color: colors.primary,
      icon: 'trophy',
      image: require('../../assets/images/rocket.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'C1',
      title: levelTitles.kompetent[userNativeLanguage],
      subtitle: levelSubtitles.anspruchsvolleAudios[userNativeLanguage],
      color: '#E91E63',
      icon: 'diamond',
      image: require('../../assets/images/diploma.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'C2',
      title: levelTitles.meister[userNativeLanguage],
      subtitle: levelSubtitles.muttersprachlichesHoeren[userNativeLanguage],
      color: '#9C27B0',
      icon: 'crown',
      image: require('../../assets/images/trophy.png'), 
      imageSize: { width: 100, height: 100 },
      imageOffset: { x: 20, y: 20 }
    }
  ];


  // Fonction pour récupérer le dernier index d'exercice
const getLastExerciseIndex = (levelId) => {
  const levelData = userData.data?.hoeren?.[levelId];
  if (levelData && typeof levelData.index === 'number') {
    return levelData.index;
  }
  return 0; // Par défaut, commencer au premier exercice
};

  // Calculer les résultats de l'exercice
  const calculateExerciseResults = () => {
    if (!selectedExercise || !selectedExercise.data || !selectedExercise.data.questions) return null;

    let totalQuestions = selectedExercise.data.questions.length;
    let correctAnswers = 0;
    const detailedResults = [];

    selectedExercise.data.questions.forEach((question, questionIndex) => {
      const selectedOptionId = selectedAnswers[questionIndex];
      
      if (selectedOptionId) {
        const selectedOption = question.options?.find(opt => opt.id === selectedOptionId);
        const isCorrect = selectedOption?.isCorrect || false;
        
        if (isCorrect) correctAnswers++;
        
        detailedResults.push({
          questionIndex: questionIndex + 1,
          questionText: question.title,
          selectedAnswer: selectedOption?.text || '',
          correctAnswer: question.options?.find(opt => opt.isCorrect)?.text || '',
          isCorrect,
          explanation: question.explanation,
          nativeExplanation: question.languages_Explanations?.[userNativeLanguage] || null
        });
      }
    });

    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      percentage,
      detailedResults: [{
        audioIndex: 1, // Garde ceci pour les exercices d'écoute
        questions: detailedResults
      }]
    };
  };

  // Gestionnaires d'événements
  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    
    const exercises = getExercisesForLevel('hoeren', levelId);
    setAvailableExercises(exercises);
    const lastIndex = getLastExerciseIndex(levelId);
    setInitialExerciseIndex(lastIndex);
    setShowExerciseSelector(true);
  };
  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseSelector(false);
    setShowExerciseModal(true);
    setShowResults(false);
    
    // Charger les réponses existantes s'il y en a
    const existingAnswers = getCurrentAnswers(exercise.id);
    setSelectedAnswers(existingAnswers);
    setExerciseResults(null);
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

  const handleFinishExercise = async () => {
    const results = calculateExerciseResults();
    setExerciseResults(results);
    setShowResults(true);
    
    // Sync automatique avec le backend
    await finishExerciseWithSync('hoeren', selectedLevel, selectedExercise.id, results);
  };

  const handleRestartExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setExerciseResults(null);
  };

  const handleNextExercise = () => {
    const currentIndex = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
    if (currentIndex < availableExercises.length - 1) {
      const nextExercise = availableExercises[currentIndex + 1];
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

  if(!isAuthenticated && initialExerciseIndex>2){
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
        userNativeLanguage={userNativeLanguage}
      />
    </SafeAreaView>
  );
};

export default HoerenScreen;