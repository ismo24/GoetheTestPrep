// LesenScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserData } from '../context/AppDataContext';
import { useExerciseData } from '../hooks/useExerciseData';
import { useSyncData } from '../hooks/useSyncData';
import LevelSelectionView from '../components/lesen/LevelSelectionView';
import PopupExerciseSelector from '../components/lesen/PopupExerciseSelector';
import ExerciseModal from '../components/lesen/ExerciseModal';
import { colors } from '../styles/colors';
// AJOUT : Import des composants d'authentification
import { AuthProvider,useAuth } from '../hooks/useAuth'; 
import AuthScreen from './AuthScreen';

const LesenScreen = ({ navigation }) => {
  const { userData } = useUserData();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { syncNow, isSyncing } = useSyncData();
  const {
    getExercisesForLevel,
    saveCurrentAnswers,
    getCurrentAnswers,
    getLevelStats,
    finishExerciseWithSync,
    updateExerciceRange,
  } = useExerciseData();
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
  const [syncAvailablesExercises, setSyncAvailablesExercises] = useState(false);

  useEffect(() => {
    //Si on a pas d'exercice, charger le prochain lot de 50
    async function loadExercises() {
      try {
        if(syncAvailablesExercises){
          const lernIndex = getLastExerciseIndex(selectedLevel);
          console.log("lernIndex", lernIndex);
          const exercices = await updateExerciceRange(
          "lesen",
          1,
          lernIndex,
          user
        );
        if (exercices.success) {
          setAvailableExercises(exercices.exercises);
          const reducedIndex = lernIndex % 50;
          const nextExercise = exercices[reducedIndex];
          setSelectedExercise(nextExercise);
          setSelectedAnswers({});
          setShowResults(false);
          setExerciseResults(null);
        }
      }
      } catch (error) {
        console.log("error",error)
      }
      finally{
        setSyncAvailablesExercises(false);
      }
    }
    loadExercises();
  }, []); //syncAvailablesExercises

  const handleSyncAvailablesExercises = () => {
    setSyncAvailablesExercises(true);
  };

  // Traductions pour les titres de niveaux
  const levelTitles = {
    anfanger: {
      DE: "Anfänger",
      FR: "Débutant",
      EN: "Beginner",
      ES: "Principiante",
      PT: "Iniciante",
      PL: "Początkujący",
      RU: "Начинающий",
      TR: "Başlangıç",
      IT: "Principiante",
      UK: "Початківець",
      VI: "Người mới bắt đầu",
      TL: "Nagsisimula",
      ZH: "初学者",
      ID: "Pemula",
      TH: "ผู้เริ่มต้น",
      MS: "Pemula",
      AR: "مبتدئ",
    },
    grundlegend: {
      DE: "Grundlegend",
      FR: "Élémentaire",
      EN: "Elementary",
      ES: "Elemental",
      PT: "Elementar",
      PL: "Podstawowy",
      RU: "Элементарный",
      TR: "Temel",
      IT: "Elementare",
      UK: "Елементарний",
      VI: "Cơ bản",
      TL: "Pangunahing",
      ZH: "基础",
      ID: "Dasar",
      TH: "ขั้นพื้นฐาน",
      MS: "Asas",
      AR: "أساسي",
    },
    mittelstufe: {
      DE: "Mittelstufe",
      FR: "Intermédiaire",
      EN: "Intermediate",
      ES: "Intermedio",
      PT: "Intermediário",
      PL: "Średnio zaawansowany",
      RU: "Средний",
      TR: "Orta seviye",
      IT: "Intermedio",
      UK: "Середній",
      VI: "Trung cấp",
      TL: "Katamtaman",
      ZH: "中级",
      ID: "Menengah",
      TH: "ระดับกลาง",
      MS: "Pertengahan",
      AR: "متوسط",
    },
    fortgeschritten: {
      DE: "Fortgeschritten",
      FR: "Avancé",
      EN: "Advanced",
      ES: "Avanzado",
      PT: "Avançado",
      PL: "Zaawansowany",
      RU: "Продвинутый",
      TR: "İleri seviye",
      IT: "Avanzato",
      UK: "Просунутий",
      VI: "Nâng cao",
      TL: "Mataas na antas",
      ZH: "高级",
      ID: "Lanjutan",
      TH: "ระดับสูง",
      MS: "Lanjutan",
      AR: "متقدم",
    },
    kompetent: {
      DE: "Kompetent",
      FR: "Compétent",
      EN: "Competent",
      ES: "Competente",
      PT: "Competente",
      PL: "Kompetentny",
      RU: "Компетентный",
      TR: "Yetkin",
      IT: "Competente",
      UK: "Компетентний",
      VI: "Thành thạo",
      TL: "Dalubhasa",
      ZH: "熟练",
      ID: "Kompeten",
      TH: "ชำนาญ",
      MS: "Cekap",
      AR: "كفء",
    },
    meister: {
      DE: "Meister",
      FR: "Maître",
      EN: "Master",
      ES: "Maestro",
      PT: "Mestre",
      PL: "Mistrz",
      RU: "Мастер",
      TR: "Usta",
      IT: "Maestro",
      UK: "Майстер",
      VI: "Bậc thầy",
      TL: "Dalubhasa",
      ZH: "大师",
      ID: "Ahli",
      TH: "ผู้เชี่ยวชาญ",
      MS: "Pakar",
      AR: "خبير",
    },
  };

  // Traductions pour les sous-titres de niveaux
  const levelSubtitles = {
    grundlegendesLesen: {
      DE: "Grundlegendes Leseverstehen",
      FR: "Compréhension de lecture de base",
      EN: "Basic reading comprehension",
      ES: "Comprensión de lectura básica",
      PT: "Compreensão básica de leitura",
      PL: "Podstawowe rozumienie czytania",
      RU: "Базовое понимание прочитанного",
      TR: "Temel okuma anlayışı",
      IT: "Comprensione di base della lettura",
      UK: "Базове розуміння прочитаного",
      VI: "Hiểu đọc cơ bản",
      TL: "Pangunahing pag-unawa sa pagbabasa",
      ZH: "基础阅读理解",
      ID: "Pemahaman membaca dasar",
      TH: "ความเข้าใจการอ่านพื้นฐาน",
      MS: "Kefahaman bacaan asas",
      AR: "فهم القراءة الأساسي",
    },
    einfacheTexte: {
      DE: "Einfache Texte verstehen",
      FR: "Comprendre des textes simples",
      EN: "Understanding simple texts",
      ES: "Entender textos simples",
      PT: "Entender textos simples",
      PL: "Rozumienie prostych tekstów",
      RU: "Понимание простых текстов",
      TR: "Basit metinleri anlama",
      IT: "Comprendere testi semplici",
      UK: "Розуміння простих текстів",
      VI: "Hiểu các văn bản đơn giản",
      TL: "Pag-unawa sa mga simpleng teksto",
      ZH: "理解简单文本",
      ID: "Memahami teks sederhana",
      TH: "เข้าใจข้อความง่ายๆ",
      MS: "Memahami teks mudah",
      AR: "فهم النصوص البسيطة",
    },
    alltaglicheTexte: {
      DE: "Alltägliche Texte verstehen",
      FR: "Comprendre des textes quotidiens",
      EN: "Understanding everyday texts",
      ES: "Entender textos cotidianos",
      PT: "Entender textos do cotidiano",
      PL: "Rozumienie codziennych tekstów",
      RU: "Понимание повседневных текстов",
      TR: "Günlük metinleri anlama",
      IT: "Comprendere testi quotidiani",
      UK: "Розуміння повсякденних текстів",
      VI: "Hiểu các văn bản hàng ngày",
      TL: "Pag-unawa sa mga araw-araw na teksto",
      ZH: "理解日常文本",
      ID: "Memahami teks sehari-hari",
      TH: "เข้าใจข้อความในชีวิตประจำวัน",
      MS: "Memahami teks harian",
      AR: "فهم النصوص اليومية",
    },
    komplexeTexte: {
      DE: "Komplexe Texte verstehen",
      FR: "Comprendre des textes complexes",
      EN: "Understanding complex texts",
      ES: "Entender textos complejos",
      PT: "Entender textos complexos",
      PL: "Rozumienie złożonych tekstów",
      RU: "Понимание сложных текстов",
      TR: "Karmaşık metinleri anlama",
      IT: "Comprendere testi complessi",
      UK: "Розуміння складних текстів",
      VI: "Hiểu các văn bản phức tạp",
      TL: "Pag-unawa sa mga kumplikadong teksto",
      ZH: "理解复杂文本",
      ID: "Memahami teks kompleks",
      TH: "เข้าใจข้อความที่ซับซ้อน",
      MS: "Memahami teks kompleks",
      AR: "فهم النصوص المعقدة",
    },
    anspruchsvolleTexte: {
      DE: "Anspruchsvolle Texte verstehen",
      FR: "Comprendre des textes exigeants",
      EN: "Understanding demanding texts",
      ES: "Entender textos exigentes",
      PT: "Entender textos exigentes",
      PL: "Rozumienie wymagających tekstów",
      RU: "Понимание требовательных текстов",
      TR: "Zorlu metinleri anlama",
      IT: "Comprendere testi impegnativi",
      UK: "Розуміння вимогливих текстів",
      VI: "Hiểu các văn bản khó khăn",
      TL: "Pag-unawa sa mga mahirap na teksto",
      ZH: "理解要求很高的文本",
      ID: "Memahami teks yang menantang",
      TH: "เข้าใจข้อความที่ท้าทาย",
      MS: "Memahami teks yang mencabar",
      AR: "فهم النصوص المتطلبة",
    },
    muttersprachlichesLesen: {
      DE: "Muttersprachliches Leseverstehen",
      FR: "Compréhension de lecture native",
      EN: "Native-level reading comprehension",
      ES: "Comprensión de lectura nativa",
      PT: "Compreensão de leitura nativa",
      PL: "Natywne rozumienie czytania",
      RU: "Родное понимание прочитанного",
      TR: "Ana dil düzeyinde okuma anlayışı",
      IT: "Comprensione di lettura madrelingua",
      UK: "Рідне розуміння прочитаного",
      VI: "Hiểu đọc ở mức độ bản ngữ",
      TL: "Katutubong antas ng pag-unawa sa pagbabasa",
      ZH: "母语水平阅读理解",
      ID: "Pemahaman membaca tingkat native",
      TH: "ความเข้าใจการอ่านระดับเจ้าของภาษา",
      MS: "Kefahaman bacaan peringkat ibunda",
      AR: "فهم القراءة على مستوى اللغة الأم",
    },
  };

  // Traductions pour l'exercice
  const exerciseTranslations = {
    DE: "Übung",
    FR: "Exercice",
    EN: "Exercise",
    ES: "Ejercicio",
    PT: "Exercício",
    PL: "Ćwiczenie",
    RU: "Упражнение",
    TR: "Egzersiz",
    IT: "Esercizio",
    UK: "Вправа",
    VI: "Bài tập",
    TL: "Ehersisyo",
    ZH: "练习",
    ID: "Latihan",
    TH: "แบบฝึกหัด",
    MS: "Latihan",
    AR: "تمرين",
  };

  const levels = [
    {
      id: "A1",
      title: levelTitles.anfanger[userNativeLanguage],
      subtitle: levelSubtitles.grundlegendesLesen[userNativeLanguage],
      color: colors.success,
      icon: "leaf",
      image: require("../../assets/images/start.png"),
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 },
    },
    {
      id: "A2",
      title: levelTitles.grundlegend[userNativeLanguage],
      subtitle: levelSubtitles.einfacheTexte[userNativeLanguage],
      color: colors.secondary,
      icon: "flower",
      image: require("../../assets/images/basics.png"),
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 },
    },
    {
      id: "B1",
      title: levelTitles.mittelstufe[userNativeLanguage],
      subtitle: levelSubtitles.alltaglicheTexte[userNativeLanguage],
      color: colors.warning,
      icon: "star",
      image: require("../../assets/images/engrenage.png"),
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 },
    },
    {
      id: "B2",
      title: levelTitles.fortgeschritten[userNativeLanguage],
      subtitle: levelSubtitles.komplexeTexte[userNativeLanguage],
      color: colors.primary,
      icon: "trophy",
      image: require("../../assets/images/rocket.png"),
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 },
    },
    {
      id: "C1",
      title: levelTitles.kompetent[userNativeLanguage],
      subtitle: levelSubtitles.anspruchsvolleTexte[userNativeLanguage],
      color: "#E91E63",
      icon: "diamond",
      image: require("../../assets/images/diploma.png"),
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 },
    },
    {
      id: "C2",
      title: levelTitles.meister[userNativeLanguage],
      subtitle: levelSubtitles.muttersprachlichesLesen[userNativeLanguage],
      color: "#9C27B0",
      icon: "crown",
      image: require("../../assets/images/trophy.png"),
      imageSize: { width: 100, height: 100 },
      imageOffset: { x: 20, y: 20 },
    },
  ];

  const getLastExerciseIndex = (levelId) => {
    const levelData = userData.data?.lesen?.[levelId];
    if (levelData && typeof levelData.index === "number") {
      return levelData.index;
    }
    return 0; // Par défaut, commencer au premier exercice
  };

  // Calculer les résultats de l'exercice
  const calculateExerciseResults = () => {
    if (
      !selectedExercise ||
      !selectedExercise.data ||
      !selectedExercise.data.questions
    )
      return null;

    let totalQuestions = selectedExercise.data.questions.length;
    let correctAnswers = 0;
    const detailedResults = [];

    selectedExercise.data.questions.forEach((question, questionIndex) => {
      const selectedOptionId = selectedAnswers[questionIndex];

      // MODIFICATION : Gérer le cas où aucune réponse n'est sélectionnée
      if (selectedOptionId) {
        // Cas normal : une réponse a été sélectionnée
        const selectedOption = question.options?.find(
          (opt) => opt.id === selectedOptionId
        );
        const isCorrect = selectedOption?.isCorrect || false;

        if (isCorrect) correctAnswers++;

        detailedResults.push({
          questionIndex: questionIndex + 1,
          questionText: question.title,
          selectedAnswer: selectedOption?.text || "",
          correctAnswer:
            question.options?.find((opt) => opt.isCorrect)?.text || "",
          isCorrect,
          hasAnswer: true, // AJOUT : Indique qu'une réponse a été donnée
          explanation: question.explanation,
          nativeExplanation:
            question.languages_Explanations?.[userNativeLanguage] || null,
        });
      } else {
        // AJOUT : Cas où aucune réponse n'est sélectionnée (timer expiré)
        detailedResults.push({
          questionIndex: questionIndex + 1,
          questionText: question.title,
          selectedAnswer: "",
          correctAnswer:
            question.options?.find((opt) => opt.isCorrect)?.text || "",
          isCorrect: false, // Pas de réponse = incorrect
          hasAnswer: false, // AJOUT : Indique qu'aucune réponse n'a été donnée
          explanation: question.explanation,
          nativeExplanation:
            question.languages_Explanations?.[userNativeLanguage] || null,
        });
      }
    });

    // AJOUT : Retourner les résultats calculés
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      percentage,
      detailedResults: [
        {
          textIndex: 1,
          questions: detailedResults,
        },
      ],
    };
  };

  // Gestionnaires d'événements
  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    const exercises = getExercisesForLevel("lesen", levelId);
    setAvailableExercises(exercises);

    // AJOUT : Récupérer l'index initial
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
      [questionIndex]: optionId,
    };

    setSelectedAnswers(updatedAnswers);
    saveCurrentAnswers(selectedExercise.id, updatedAnswers);
  };

  const handleFinishExercise = async () => {
    const results = calculateExerciseResults();
    setExerciseResults(results);
    setShowResults(true);

    // Sync automatique avec le backend
    await finishExerciseWithSync(
      "lesen",
      selectedLevel,
      selectedExercise.id,
      results
    );
  };

  const handleRestartExercise = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setExerciseResults(null);
  };

  const handleNextExercise = () => {
    const currentIndex = availableExercises.findIndex(
      (ex) => ex.id === selectedExercise.id
    );
    if (currentIndex < availableExercises.length - 1) {
      const nextExercise = availableExercises[currentIndex + 1];
      setSelectedExercise(nextExercise);
      setSelectedAnswers({});
      setShowResults(false);
      setExerciseResults(null);
    } else {
      //Si on a pas d'exercice, charger le prochain lot de 50
      handleSyncAvailablesExercises();
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

  if (!isAuthenticated && initialExerciseIndex > 2) {
    return <AuthScreen unclosable={true} />;
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
        levelInfo={levels.find((l) => l.id === selectedLevel)}
        availableExercises={availableExercises}
        initialExerciseIndex={initialExerciseIndex}
        onSelectExercise={handleExerciseSelect}
        onCancel={handleCloseSelectorPopup}
      />

      <ExerciseModal
        visible={showExerciseModal}
        showResults={showResults}
        selectedExercise={selectedExercise}
        selectedAnswers={selectedAnswers}
        exerciseResults={exerciseResults}
        levelInfo={levels.find((l) => l.id === selectedLevel)}
        availableExercises={availableExercises}
        onClose={handleCloseModal}
        onSelectAnswer={handleSelectAnswer}
        onFinishExercise={handleFinishExercise}
        onRestart={handleRestartExercise}
        onNextExercise={handleNextExercise}
        handleSyncAvailablesExercises={handleSyncAvailablesExercises}
      />
    </SafeAreaView>
  );
};

export default LesenScreen;