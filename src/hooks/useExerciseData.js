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
      word: originalExercise.word || "",
      sentence: originalExercise.sentence || "",
      word_languages_explanations: originalExercise.word_languages_explanations || {},
      sentence_languages_explanations: originalExercise.sentence_languages_explanations || {}
    };
  }).filter(Boolean);

  // console.log("✅ Final ordered exercises count:", orderedExercises.length);
  // console.log("✅ First 3 exercises:", orderedExercises.slice(0, 3).map(ex => ({ id: ex.id, word: ex.word })));
  
  return orderedExercises;
}, [lernData, userData, userDispatch]); // AJOUTER userDispatch aux dépendances

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
            audio_url: exercise.audio_url
          };
        
        case 'lesen':
        case 'grammar':
        default:
          return baseExercise;
      }
    });
  }, [lernData, userData, getVokabelnExercisesForLevel]);

  // NOUVEAU: Fonction pour gérer la révélation des mots de vocabulaire
  const handleVocabularyReveal = useCallback(async (exerciseId, levelId, value, index) => {
    const userLevelData = userData.data.vokabeln?.[levelId] || { learning: [] };
    const currentLearningList = [...(userLevelData.learning || [])];
    

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
        // console.log(`⚠️ Duplication adjacente détectée pour ${exerciseId} à la position ${insertPosition}`);
        // console.log(`Élément avant (${insertPosition-1}): ${elementBefore}`);
        // console.log(`Élément à (${insertPosition}): ${elementAt}`);
        // console.log(`❌ Ajout annulé pour éviter la duplication adjacente`);
        return; // Annuler l'ajout
      }
      
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
    return userData.currentSession[exerciseId]?.answers || {};
  }, [userData.currentSession]);

  // Terminer un exercice avec synchronisation
  const finishExerciseWithSync = useCallback(async (skillType, level, exerciseId, results) => {
    const exerciseKey = `${skillType}-${level}-${exerciseId}`;
    
    if (processingExercises.current.has(exerciseKey)) {
      // console.log(`⚠️ Exercice ${exerciseKey} déjà en cours de traitement, ignoré`);
      return;
    }
    
    processingExercises.current.add(exerciseKey);
    
    try {
      const note = results.percentage;
      
      // console.log(`🎯 Traitement de l'exercice ${exerciseKey} avec note ${note}`);
      
      // Sauvegarder localement d'abord
      userDispatch({
        type: 'UPDATE_EXERCISE_RESULT',
        payload: { skillType, level, exerciseId, note }
      });

      // NOUVEAU: Logique spécifique pour vokabeln
      if (skillType === 'vokabeln') {
        const userLevelData = userData.data.vokabeln?.[level] || { learning: [] };
        const learning = userLevelData.learning || [];
        const currentIndex = userLevelData.index || 0;
        
        // Avancer à la prochaine position dans la learning list
        if (currentIndex < learning.length - 1) {
          const newIndex = currentIndex + 1;
          // console.log(`📈 Mise à jour index vocabulaire: ${currentIndex} → ${newIndex}`);
          
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
          // console.log(`📈 Mise à jour de l'index: ${currentIndex} → ${newIndex}`);
          
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

    } finally {
      setTimeout(() => {
        processingExercises.current.delete(exerciseKey);
      }, 1000);
    }
  }, [userData, userDispatch, lernData]);

  return {
    getExercisesForLevel,
    getCurrentExerciseForLevel,
    getLevelStats,
    saveCurrentAnswers,
    getCurrentAnswers,
    finishExerciseWithSync,
    handleVocabularyReveal // NOUVEAU: Exporter la fonction de révélation
  };
};