import { useCallback, useRef } from 'react';
import { useLernData, useUserData } from '../context/AppDataContext';
// import { DataService } from '../services/DataService';

export const useExerciseData = () => {
  const { lernData } = useLernData();
  const { userData, userDispatch } = useUserData();
  
  const processingExercises = useRef(new Set());

  // NOUVEAU: Fonction pour gérer la logique spécifique des vocabulaires
  // REMPLACEZ la fonction getVokabelnExercisesForLevel dans useExerciseData.js :

const getVokabelnExercisesForLevel = useCallback((levelId) => {
  const allExercises = lernData.vokabeln?.[levelId] || [];
  const userLevelData = userData.data.vokabeln?.[levelId] || { 
    index: 0, 
    total: 0, 
    data: {}, 
    learning: [] 
  };
  

  
  // Si pas de liste learning, créer une liste par défaut avec tous les exercices
  let learningList;
  if (userLevelData.learning && userLevelData.learning.length > 0) {
    learningList = userLevelData.learning;
    // console.log("✅ Using existing learning list:", learningList);
  } else {
    // Créer une learning list par défaut
    learningList = allExercises.map(ex => ex.id);
    // console.log("🆕 Creating default learning list:", learningList);
    
    // Optionnel: Initialiser automatiquement dans les données utilisateur
    if (learningList.length > 0) {
      userDispatch({
        type: 'INITIALIZE_VOCABULARY_LEARNING',
        payload: { 
          levelId, 
          exerciseIds: learningList 
        }
      });
    }
  }
  
  // Créer la liste ordonnée basée sur learning
  const orderedExercises = learningList.map((exerciseId, learningIndex) => {
    const originalExercise = allExercises.find(ex => ex.id === exerciseId);
    if (!originalExercise) {
      // console.warn(`⚠️ Exercice ${exerciseId} introuvable dans les données de base`);
      return null;
    }
    
    const userExerciseData = userLevelData.data[exerciseId] || {};
    
    return {
      id: originalExercise.id,
      title: `Vocabulaire ${originalExercise.word}`,
      questionsCount: 1,
      totalQuestions: 1,
      data: originalExercise,
      completed: userExerciseData.lastNote !== undefined,
      lastResult: userExerciseData.lastNote || 0,
      learningIndex: learningIndex, // NOUVEAU: Index dans la learning list
      solution: originalExercise.solution,
      questionType: originalExercise.questionType,
      text: originalExercise.text || "",
      image_url: originalExercise.image_url || "",
      audio_url: originalExercise.audio_url || "",
      word: originalExercise.word || "",
      sentence: originalExercise.sentence || "",
      word_in_sentence:originalExercise.word_in_sentence || "",
      word_languages_explanations: originalExercise.word_languages_explanations || {},
      sentence_languages_explanations: originalExercise.sentence_languages_explanations || {}
    };
  }).filter(Boolean);

  // console.log("✅ Final ordered exercises count:", orderedExercises.length);
  // console.log("✅ First 3 exercises:", orderedExercises.slice(0, 3).map(ex => ({ id: ex.id, word: ex.word })));
  
  return orderedExercises;
}, [lernData, userData, userDispatch]); // AJOUTER userDispatch aux dépendances

  



const getAllStats = useCallback(() => {
  const skillTypes = ["lesen", "hoeren", "schreiben", "sprechen", "grammar"];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const Statistiques = {
    lesen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    hoeren: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    schreiben: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    sprechen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    vocabulary: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    grammar: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] }
  };

  // Traitement des compétences standards (lesen, hoeren, schreiben, sprechen, grammar)
  for (const skillType of skillTypes) {
    for (const level of levels) {
      const exercises = lernData[skillType]?.[level] || [];
      const userLevelData = userData.data[skillType]?.[level] || { index: 0, total: 0, data: {} };
      const levelStat = [];

      // Pour chaque exercice, récupérer la note
      exercises.forEach(exercise => {
        const userExerciseData = userLevelData.data[exercise.id];
        if (userExerciseData && userExerciseData.lastNote !== undefined) {
          levelStat.push(userExerciseData.lastNote);
        }
      });

      Statistiques[skillType][level] = levelStat;
    }
  }

  // Traitement spécial pour vocabulary (vokabeln dans les données)
  for (const level of levels) {
    const userLevelData = userData.data.vokabeln?.[level] || { index: 0, total: 0, data: {}, learning: [] };
    const levelStat = [];

    // Utiliser la learning list pour vocabulary
    const learningList = userLevelData.learning || [];
    const uniqueExercises = [...new Set(learningList)]; // Éviter les doublons

    uniqueExercises.forEach(exerciseId => {
      const userExerciseData = userLevelData.data[exerciseId];
      if (userExerciseData && userExerciseData.lastNote !== undefined) {
        levelStat.push(userExerciseData.lastNote);
      }
    });

    Statistiques.vocabulary[level] = levelStat;
  }

  return Statistiques;
}, [lernData, userData]);

// Fonction utilitaire pour obtenir des statistiques agrégées
const getAggregatedStats = useCallback(() => {
  const skillTypes = ["lesen", "hoeren", "schreiben", "sprechen", "grammar"];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const aggregated = {};

  // Traitement des compétences standards
  for (const skillType of skillTypes) {
    aggregated[skillType] = {};
    
    for (const level of levels) {
      const exercises = lernData[skillType]?.[level] || [];
      const userLevelData = userData.data[skillType]?.[level] || { index: 0, total: 0, data: {} };
      
      const total = exercises.length;
      let success = 0;
      let sumPercentages = 0;

      exercises.forEach(exercise => {
        const userExerciseData = userLevelData.data[exercise.id];
        const percentage = userExerciseData?.lastNote || 0;
        
        sumPercentages += percentage;
        if (percentage === 100) {
          success++;
        }
      });

      const average = total > 0 ? Math.round(sumPercentages / total) : 0;

      aggregated[skillType][level] = {
        total,
        success,
        average
      };
    }
  }

  // Traitement spécial pour vocabulary (vokabeln)
  aggregated.vocabulary = {};
  
  for (const level of levels) {
    const allExercises = lernData.vokabeln?.[level] || [];
    const userLevelData = userData.data.vokabeln?.[level] || { index: 0, total: 0, data: {}, learning: [] };
    
    const total = allExercises.length;
    let success = 0;
    let sumPercentages = 0;

    allExercises.forEach(exercise => {
      const userExerciseData = userLevelData.data[exercise.id];
      const percentage = userExerciseData?.lastNote || 0;
      
      sumPercentages += percentage;
      if (percentage === 100) {
        success++;
      }
    });

    const average = total > 0 ? Math.round(sumPercentages / total) : 0;

    aggregated.vocabulary[level] = {
      total,
      success,
      average
    };
  }

  return aggregated;
}, [lernData, userData]);

// Fonction pour déterminer le niveau actuel d'un utilisateur pour une compétence
const determineUserLevel = (skillStats, threshold = 60) => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  let currentLevel = undefined;

  for (const level of levels) {
    if (skillStats[level] && skillStats[level].average >= threshold) {
      currentLevel = level;
    }
  }

  return currentLevel;
};

// Fonction pour obtenir les statistiques globales de l'utilisateur
const getOverallUserStats = useCallback(() => {
  const aggregatedStats = getAggregatedStats();
  const skillTypes = ["lesen", "hoeren", "schreiben", "sprechen", "vocabulary", "grammar"];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const overallStats = {};

  skillTypes.forEach(skillType => {
    let totalExercises = 0;
    let totalSuccess = 0;
    let sumAverages = 0;
    let levelsWithExercises = 0;

    // Calculer les totaux et moyennes pour cette compétence
    levels.forEach(level => {
      const levelStats = aggregatedStats[skillType][level];
      totalExercises += levelStats.total;
      totalSuccess += levelStats.success;
      
      // Compter les niveaux qui ont des exercices pour calculer la moyenne
      if (levelStats.total > 0) {
        sumAverages += levelStats.average;
        levelsWithExercises++;
      }
    });

    // Calculer la moyenne des pourcentages par niveau
    const average = levelsWithExercises > 0 ? Math.round(sumAverages / levelsWithExercises) : 0;

    // Déterminer le niveau actuel
    const currentLevel = determineUserLevel(aggregatedStats[skillType], 60);

    overallStats[skillType] = {
      total: totalExercises,
      success: totalSuccess,
      average: average,
      level: currentLevel
    };
  });

  return overallStats;
}, [getAggregatedStats]);


  // Obtenir les exercices pour un niveau donné
  const getExercisesForLevel = useCallback((skillType, levelId) => {
    // NOUVEAU: Logique spécifique pour vokabeln
    if (skillType === 'vokabeln') {
      return getVokabelnExercisesForLevel(levelId);
    }

    // Logique existante pour les autres compétences
    const exercises = lernData[skillType]?.[levelId] || [];
    const userLevelData = userData.data[skillType]?.[levelId] || { index: 0, total: 0, data: {} };
    
    return exercises.map((exercise, index) => {
      const userExerciseData = userLevelData.data[exercise.id] || {};
      
      const baseExercise = {
        id: exercise.id,
        title: `Exercice ${index + 1}`,
        questionsCount: exercise.questions?.length || 0,
        totalQuestions: exercise.questions?.length || 0,
        data: exercise,
        completed: userExerciseData.lastNote !== undefined,
        lastResult: userExerciseData.lastNote || 0,
        index: index
      };
  
      switch (skillType) {
        case 'schreiben':
        case 'sprechen':
          return {
            ...baseExercise,
            solution: exercise.solution,
            questionType: exercise.questionType,
            formular_grid: exercise.formular_grid || false,
            image_url: exercise.image_url || ""
          };
        
        case 'hoeren':
          return {
            ...baseExercise,
            audio_url: exercise.audio_url,
            repeat_audio:exercise.repeat_audio
          };
        
        
        case 'grammar':
          return {
            ...baseExercise,
            text_language_explanations:exercise.text_language_explanations || ""
          }

        case 'lesen':
        default:
          return baseExercise;
      }
    });
  }, [lernData, userData, getVokabelnExercisesForLevel]);

  // NOUVEAU: Fonction pour gérer la révélation des mots de vocabulaire
  const handleVocabularyReveal = useCallback(async (exerciseId, levelId, value, index) => {
    const userLevelData = userData.data.vokabeln?.[levelId] || { learning: [] };
    const currentLearningList = [...(userLevelData.learning || [])];
    
    console.log("Fonction appelée")

    if(value=="never"){
      console.log("Cet exercice n'est pas à rajouer")
      return
    }

    // Compter les occurrences actuelles
    const currentCount = currentLearningList.filter(id => id === exerciseId).length;
    
    // NOUVELLE CONDITION: Insérer seulement si occurrences < 10 OU si value == false
    const shouldInsert = currentCount < 10 || value === false;
    
    if (shouldInsert) {
      let insertPosition;
      
      if (currentCount === 0) {
        // Premier ajout : insérer à la fin
        insertPosition = currentLearningList.length;
      } else {
        // Calcul de la position selon la formule : x = index + ((currentLearningList.length - 1 - index) / (10 - o))
        const currentIndex = index || 0; // Index actuel (position dans la liste des exercices)
        const listLength = currentLearningList.length;
        const o = currentCount; // Nombre d'occurrences actuelles
        
        // Calculer l'offset basé sur la formule corrigée
        const denominator = 10 - o;
        
        // Éviter la division par zéro si o = 10
        if (denominator <= 0) {
          insertPosition = listLength; // Insérer à la fin si denominator invalide
        } else {
          const offset = Math.floor((listLength - 1 - currentIndex) / denominator);
          insertPosition = currentIndex + offset;
          
          // S'assurer que la position est dans les limites valides
          insertPosition = Math.max(0, Math.min(insertPosition, listLength));
        }
      }
      
      // NOUVEAU: Vérification des doublons adjacents
      const elementBefore = insertPosition > 0 ? currentLearningList[insertPosition - 1] : null;
      const elementAt = insertPosition < currentLearningList.length ? currentLearningList[insertPosition] : null;
      
      // Vérifier si l'exercice à insérer est identique aux éléments adjacents
      const isDuplicateBefore = elementBefore === exerciseId;
      const isDuplicateAt = elementAt === exerciseId;
      
      if (isDuplicateBefore || isDuplicateAt) {
       
        console.log("isDuplicateBefore || isDuplicateAt",elementBefore ,elementAt)
        return; // Annuler l'ajout
      }

      console.log("Ici on devrait en ajouter")
      
      // Insérer l'exercice à la position calculée
      currentLearningList.splice(insertPosition, 0, exerciseId);
      
      // Mettre à jour localement
      userDispatch({
        type: 'UPDATE_VOCABULARY_LEARNING',
        payload: { 
          levelId, 
          learning: currentLearningList 
        }
      });
      
      // console.log(`✅ Ajouté ${exerciseId} à la liste d'apprentissage à la position ${insertPosition}`);
      // console.log(`📊 Occurrences: ${currentCount + 1}/10, value: ${value}, shouldInsert: ${shouldInsert}`);
      
      // TODO: Synchroniser avec le backend
      // try {
      //   if (userData.clientid) {
      //     await DataService.syncVocabularyLearning(userData.clientid, levelId, currentLearningList);
      //   }
      // } catch (error) {
      //   console.warn('Sync learning list échouée:', error);
      // }
    } else {
      // console.log(`ℹ️ ${exerciseId} a déjà ${currentCount} occurrences et value=${value}, pas d'ajout.`);
    }
  }, [userData, userDispatch]);

  // Obtenir l'exercice actuel pour un niveau
  const getCurrentExerciseForLevel = useCallback((skillType, levelId) => {
    const exercises = getExercisesForLevel(skillType, levelId);
    
    // NOUVEAU: Pour vokabeln, utiliser l'index de la learning list
    if (skillType === 'vokabeln') {
      const userLevelData = userData.data.vokabeln?.[levelId] || { index: 0 };
      const currentIndex = userLevelData.index || 0;
      return exercises[currentIndex] || null;
    }
    
    // Logique existante pour les autres compétences
    const currentIndex = userData.data[skillType]?.[levelId]?.index || 0;
    return exercises[currentIndex] || null;
  }, [getExercisesForLevel, userData]);

  // Obtenir les statistiques d'un niveau
  const getLevelStats = useCallback((skillType, levelId) => {
    const levelData = userData.data[skillType]?.[levelId];
    if (!levelData) return { index: 0, total: 0, completed: 0, average: 0 };

    // NOUVEAU: Pour vokabeln, compter les exercices uniques dans learning
    if (skillType === 'vokabeln') {
      const learning = levelData.learning || [];
      const uniqueExercises = [...new Set(learning)];
      const completed = uniqueExercises.filter(id => levelData.data[id]?.lastNote !== undefined).length;
      const average = uniqueExercises.length > 0 
        ? uniqueExercises.reduce((sum, id) => sum + (levelData.data[id]?.lastNote || 0), 0) / uniqueExercises.length 
        : 0;

      return {
        index: levelData.index || 0,
        total: learning.length,
        completed,
        average: Math.round(average)
      };
    }

    // Logique existante pour les autres compétences
    const exercises = Object.values(levelData.data);
    const completed = exercises.filter(ex => ex.lastNote !== undefined).length;
    const average = exercises.length > 0 
      ? exercises.reduce((sum, ex) => sum + (ex.lastNote || 0), 0) / exercises.length 
      : 0;

    return {
      index: levelData.index,
      total: levelData.total,
      completed,
      average: Math.round(average)
    };
  }, [userData]);

  // Sauvegarder les réponses temporaires
  const saveCurrentAnswers = useCallback((exerciseId, answers) => {
    userDispatch({
      type: 'SAVE_CURRENT_ANSWERS',
      payload: { exerciseId, answers }
    });
  }, [userDispatch]);

  // Obtenir les réponses courantes d'un exercice
  const getCurrentAnswers = useCallback((exerciseId) => {
    if (!userData || !userData.currentSession) {
      return {};
    }
    return userData.currentSession[exerciseId]?.answers || {};
  }, [userData.currentSession]);

  // Terminer un exercice avec synchronisation
  const saveOverallStats = useCallback(() => {
    const stats = getOverallUserStats();
    const timestamp = Date.now();
  
    userDispatch({
      type: 'UPDATE_OVERALL_STATS',
      payload: {
        stats,
        timestamp
      }
    });
  
    return stats;
  }, [getOverallUserStats, userDispatch]);
  
  // 2. Fonction pour récupérer les statistiques avec cache intelligent
  const getCachedOverallStats = useCallback((maxAge = 5 * 60 * 1000) => { // 5 minutes par défaut
    const cachedStats = userData.overallStats;
  
    // Vérifier si le cache est valide
    if (cachedStats && cachedStats.lastUpdated) {
      const age = Date.now() - cachedStats.lastUpdated;
      if (age < maxAge) {
        return cachedStats.data;
      }
    }
  
    // Cache expiré ou inexistant, recalculer et sauvegarder
    return saveOverallStats();
  }, [userData.overallStats, saveOverallStats]);
  
  // 3. Fonction pour forcer le rafraîchissement des statistiques
  const refreshOverallStats = useCallback(() => {
    userDispatch({ type: 'CLEAR_STATS_CACHE' });
    return saveOverallStats();
  }, [saveOverallStats, userDispatch]);
  
  // 4. Modifier votre fonction finishExerciseWithSync pour mettre à jour automatiquement les stats
  const finishExerciseWithSync = useCallback(async (skillType, level, exerciseId, results, actualIndex) => {
    const exerciseKey = `${skillType}-${level}-${exerciseId}`;
  
    console.log("finishExerciseWithSync a commencé :", skillType, level, exerciseId);
    
    if (processingExercises.current.has(exerciseKey)) {
      return;
    }
    
    processingExercises.current.add(exerciseKey);
    
    try {
      const note = results.percentage;
      
      // Sauvegarder localement d'abord
      userDispatch({
        type: 'UPDATE_EXERCISE_RESULT',
        payload: { skillType, level, exerciseId, note }
      });
  
      // NOUVEAU: Logique spécifique pour vokabeln
      if (skillType === 'vokabeln') {
        const userLevelData = userData.data.vokabeln?.[level] || { learning: [] };
        const learning = userLevelData.learning || [];
        const currentIndex = (actualIndex !== null && actualIndex !== undefined && Number.isInteger(actualIndex)) ? actualIndex : userLevelData.index || 0;
          
        // Avancer à la prochaine position dans la learning list
        if (currentIndex < learning.length - 1) {
          const newIndex = currentIndex + 1;
          console.log(`📈 Mise à jour index vocabulaire: ${currentIndex} → ${newIndex}`);
          
          userDispatch({
            type: 'UPDATE_LEVEL_INDEX',
            payload: { skillType, level, newIndex }
          });
        }
      } else {
        // Logique existante pour les autres compétences
        const currentIndex = userData.data[skillType]?.[level]?.index || 0;
        const exercises = lernData[skillType]?.[level] || [];
        const exerciseIndex = exercises.findIndex(ex => ex.id === exerciseId);
        
        if (exerciseIndex >= currentIndex && exerciseIndex < exercises.length - 1) {
          const newIndex = exerciseIndex + 1;
          
          userDispatch({
            type: 'UPDATE_LEVEL_INDEX',
            payload: { skillType, level, newIndex }
          });
        }
      }
  
      // Nettoyer la session courante
      userDispatch({
        type: 'SAVE_CURRENT_ANSWERS',
        payload: { exerciseId, answers: {} }
      });
  
      // NOUVEAU: Recalculer automatiquement les statistiques après un exercice terminé
      setTimeout(() => {
        saveOverallStats();
      }, 100); // Petit délai pour s'assurer que les mises à jour précédentes sont appliquées
  
    } finally {
      setTimeout(() => {
        processingExercises.current.delete(exerciseKey);
      }, 1000);
    }
  }, [userData, userDispatch, lernData, saveOverallStats]);
  

  return {
    getExercisesForLevel,
    getCurrentExerciseForLevel,
    getLevelStats,
    saveCurrentAnswers,
    getCurrentAnswers,
    finishExerciseWithSync,
    handleVocabularyReveal,
    getAllStats,
    getAggregatedStats,
    getOverallUserStats,
    saveOverallStats,
    getCachedOverallStats,
    refreshOverallStats
  };
};