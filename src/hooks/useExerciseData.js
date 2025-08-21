import { useCallback } from 'react';
import { useLernData, useUserData } from '../context/AppDataContext';
// import { DataService } from '../services/DataService';

export const useExerciseData = () => {
  const { lernData } = useLernData();
  const { userData, userDispatch } = useUserData();

  // Obtenir les exercices pour un niveau donné
  const getExercisesForLevel = useCallback((skillType, levelId) => {
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
  
      // ✅ SPÉCIFICITÉS PAR TYPE DE COMPÉTENCE
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
            audioUrl: exercise.audioUrl
          };
        
        case 'vokabeln': // ← NOUVEAU CASE POUR VOCABULAIRE
          return {
            ...baseExercise,
            text: exercise.text || "",
            image_url: exercise.image_url || "",
            word: exercise.word || "",
            sentence: exercise.sentence || "",
            word_languages_explanations: exercise.word_languages_explanations || {},
            sentence_languages_explanations: exercise.sentence_languages_explanations || {}
          };
        
        case 'lesen':
        case 'grammar':
        default:
          return baseExercise;
      }
    });
  }, [lernData, userData]);
  
  


  // Obtenir l'exercice actuel pour un niveau
  const getCurrentExerciseForLevel = useCallback((skillType, levelId) => {
    const exercises = getExercisesForLevel(skillType, levelId);
    const currentIndex = userData.data[skillType]?.[levelId]?.index || 0;
    return exercises[currentIndex] || null;
  }, [getExercisesForLevel, userData]);

  // Obtenir les statistiques d'un niveau
  const getLevelStats = useCallback((skillType, levelId) => {
    const levelData = userData.data[skillType]?.[levelId];
    if (!levelData) return { index: 0, total: 0, completed: 0, average: 0 };

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

  // Terminer un exercice et sauvegarder le résultat
  
  // Obtenir les réponses courantes d'un exercice
  const getCurrentAnswers = useCallback((exerciseId) => {
    return userData.currentSession[exerciseId]?.answers || {};
  }, [userData.currentSession]);

  const finishExerciseWithSync = useCallback(async (skillType, level, exerciseId, results) => {
    const note = results.percentage;
    
    // Sauvegarder localement d'abord
    userDispatch({
      type: 'UPDATE_EXERCISE_RESULT',
      payload: { skillType, level, exerciseId, note }
    });

    // Mettre à jour l'index
    const currentIndex = userData.data[skillType]?.[level]?.index || 0;
    const exercises = lernData[skillType]?.[level] || [];
    const exerciseIndex = exercises.findIndex(ex => ex.id === exerciseId);
    

    console.log("exerciseIndex",exerciseIndex)
    console.log("currentIndex",currentIndex)
    console.log("exercises.length - 1",exercises.length - 1)

    // if (exerciseIndex >= currentIndex) {
      const newIndex = Math.min(exerciseIndex + 1, exercises.length - 1);
      userDispatch({
        type: 'UPDATE_LEVEL_INDEX',
        payload: { skillType, level, newIndex }
      });
    // }

    // Synchroniser avec le backend en arrière-plan
    // try {
    //   if (userData.clientid) {
    //     await DataService.syncExerciseResult(userData.clientid, skillType, level, exerciseId, results);
    //   }
    // } catch (error) {
    //   console.warn('Sync en arrière-plan échouée, sera retentée plus tard:', error);
    //   // La donnée est déjà sauvée localement, pas de problème
    // }

    // Nettoyer la session courante
    userDispatch({
      type: 'SAVE_CURRENT_ANSWERS',
      payload: { exerciseId, answers: {} }
    });

  }, [userData, userDispatch, lernData]);

  return {
    getExercisesForLevel,
    getCurrentExerciseForLevel,
    getLevelStats,
    saveCurrentAnswers,
    getCurrentAnswers,
    finishExerciseWithSync
  };
};