import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./firebase.config"; // Importer la configuration



export class FirebaseDataService {
  // ================================
  // MÉTHODES DE CHARGEMENT INITIAL
  // ================================

  // ================================
// NOUVELLE MÉTHODE DE CHARGEMENT INITIAL MODIFIÉE
// ================================

static async loadInitialData() {
  try {
    console.log('Chargement initial des données (limité à 50 par skill_level)...');

    const asyncData = await AsyncStorage.getItem('user');
    const user = asyncData ? JSON.parse(asyncData) : null;
    const isAuthenticated = user?.uid ? true : false;

    // 1. Initialiser l'objet userData avec les index et totaux
    console.log('Initialisation des index utilisateur...');
    const userDataStructure = await this.initializeUserDataIndexes(user?.uid, isAuthenticated);
    
    // 2. Récupérer les 50 exercices correspondant aux index actuels
    console.log('Récupération des exercices pour les index actuels...');
    const lernData = await this.fetchCurrentRangeLernData(userDataStructure);
    
    // 3. Récupérer les résultats des exercices pour cette plage
    console.log('Récupération des résultats pour la plage actuelle...');
    const userData = await this.fetchCurrentRangeUserData(userDataStructure, user?.uid, isAuthenticated);

    console.log("userData",userData)

    return {
      lernData: lernData,
      userData: userData
    };

  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    
    // Fallback vers les données locales en cas d'erreur réseau
    try {
      return await this.loadLocalData();
    } catch (localError) {
      console.error("Erreur chargement données locales:", localError);
      // Dernier recours : structure par défaut
      return {
        lernData: this.getDefaultLernDataStructure(),
        userData: this.getDefaultUserStructure()
      };
    }
  }
}

// ================================
// NOUVELLES FONCTIONS POUR LA GESTION DES INDEX
// ================================

static async initializeUserDataIndexes(userId = null, isAuthenticated = false) {
  try {
    console.log('Initialisation des index utilisateur...');
    
    const skillTypes = ["lesen", "hoeren", "sprechen", "schreiben", "grammar"];
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const userDataIndexes = {};

    // Si utilisateur authentifié, récupérer ses index depuis Firebase
    if (isAuthenticated && userId) {
      console.log('Récupération des index depuis Firebase...');
      
      for (const skillType of skillTypes) {
        userDataIndexes[skillType] = {};
        
        for (const level of levels) {
          try {
            const summaryRef = doc(db, 'users', userId, 'skill_summaries', `${skillType}_${level}`);
            const summarySnap = await getDoc(summaryRef);
            
            if (summarySnap.exists()) {
              const data = summarySnap.data();
              userDataIndexes[skillType][level] = {
                index: data.index || 0,
                total: data.total || 0
              };
            } else {
              // Récupérer le total depuis les métadonnées et initialiser index à 0
              const metadata = await this.getSkillLevelMetadata(skillType, level);
              userDataIndexes[skillType][level] = {
                index: 0,
                total: metadata?.totalCount || 0
              };
            }
          } catch (error) {
            console.warn(`Erreur récupération index ${skillType}_${level}:`, error);
            // Fallback vers métadonnées
            const metadata = await this.getSkillLevelMetadata(skillType, level);
            userDataIndexes[skillType][level] = {
              index: 0,
              total: metadata?.totalCount || 0
            };
          }
        }
      }
    } else {
      // Utilisateur non authentifié : index à 0 pour tous
      console.log('Utilisateur non authentifié - initialisation index à 0...');
      
      for (const skillType of skillTypes) {
        userDataIndexes[skillType] = {};
        
        for (const level of levels) {
          // Récupérer le total depuis les métadonnées
          const metadata = await this.getSkillLevelMetadata(skillType, level);
          userDataIndexes[skillType][level] = {
            index: 0,
            total: metadata?.totalCount || 0
          };
        }
      }
    }

    console.log('Index utilisateur initialisés:', userDataIndexes);
    return userDataIndexes;
    
  } catch (error) {
    console.error('Erreur initialisation index utilisateur:', error);
    throw error;
  }
}

// ================================
// FONCTION POUR RÉCUPÉRER LES 50 EXERCICES ACTUELS
// ================================

static async fetchCurrentRangeLernData(userDataIndexes) {
  try {
    console.log('Récupération des exercices pour la plage actuelle...');
    
    const organizedData = {
      lesen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      hoeren: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      sprechen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      schreiben: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      grammar: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] }
    };

    for (const [skillType, skillLevels] of Object.entries(userDataIndexes)) {
      for (const [level, indexData] of Object.entries(skillLevels)) {
        if (indexData.total > 0) {
          const exercises = await this.fetchExercisesForCurrentRange(
            skillType, 
            level, 
            indexData.index, 
            indexData.total
          );
          organizedData[skillType][level] = exercises;
        }
      }
    }

    // Sauvegarder localement
    await this.saveLocalLernData(organizedData);
    
    return organizedData;
    
  } catch (error) {
    console.error('Erreur récupération exercices plage actuelle:', error);
    throw error;
  }
}

static async fetchExercisesForCurrentRange(skillType, level, currentIndex, totalExercises) {
  try {
    // Calculer la plage de 50 exercices autour de l'index actuel
    const rangeStart = Math.max(0, Math.floor(currentIndex / 50) * 50);
    const rangeEnd = Math.min(totalExercises - 1, rangeStart + 49);
    
    console.log(`Récupération ${skillType}_${level}: exercices ${rangeStart} à ${rangeEnd}`);
    
    // Déterminer quel batch contient cette plage
    // Chaque batch contient 50 exercices, numérotés à partir de 1
    const batchNumber = Math.floor(rangeStart / 50) + 1;
    const skillLevel = `${skillType}_${level}`;
    const batchName = `${skillLevel}_batch_${batchNumber.toString().padStart(2, "0")}`;
    
    console.log(`Récupération du batch: ${batchName}`);
    
    const batchRef = doc(db, "exercise_batches", batchName);
    const batchSnap = await getDoc(batchRef);
    
    if (!batchSnap.exists()) {
      console.warn(`Batch ${batchName} non trouvé`);
      return [];
    }
    
    const batchData = batchSnap.data();
    const exercises = [];
    
    // Convertir chaque exercice du batch en objet avec ID
    Object.entries(batchData).forEach(([exerciseId, exerciseData]) => {
      exercises.push({
        id: exerciseId,
        ...exerciseData,
        skillType: skillType,
        level: level
      });
    });
    
    // Trier par ID et ne retourner que les 50 exercices de la plage
    exercises.sort((a, b) => {
      const aNum = parseInt(a.id.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.id.match(/\d+/)?.[0] || '0');
      return aNum - bNum;
    });
    
    console.log(`${skillType}_${level}: ${exercises.length} exercices récupérés`);
    return exercises;
    
  } catch (error) {
    console.error(`Erreur récupération exercices ${skillType}_${level}:`, error);
    return [];
  }
}

// ================================
// FONCTION POUR RÉCUPÉRER LES RÉSULTATS DE LA PLAGE ACTUELLE
// ================================

static async fetchCurrentRangeUserData(userDataIndexes, userId = null, isAuthenticated = false) {
  try {
    console.log('Récupération des données utilisateur pour la plage actuelle...');
    
    // Structure de base
    const userData = {
      clientid: userId || "",
      nativeLanguage: "FR",
      subscription: "",
      paiementInfos: "",
      data: {}
    };
    
    // Initialiser la structure data
    for (const [skillType, skillLevels] of Object.entries(userDataIndexes)) {
      userData.data[skillType] = {};
      
      for (const [level, indexData] of Object.entries(skillLevels)) {
        userData.data[skillType][level] = {
          index: indexData.index,
          total: indexData.total,
          data: {}
        };
        
        // Récupérer les résultats pour la plage actuelle
        if (isAuthenticated && userId && indexData.total > 0) {
          const exerciseResults = await this.fetchExerciseResultsForCurrentRange(
            userId,
            skillType,
            level,
            indexData.index,
            indexData.total
          );
          userData.data[skillType][level].data = exerciseResults;
        } else {
          // Utilisateur non authentifié : initialiser 50 exercices vides
          const rangeStart = Math.max(0, Math.floor(indexData.index / 50) * 50);
          const rangeEnd = Math.min(indexData.total - 1, rangeStart + 49);
          
          for (let i = rangeStart; i <= rangeEnd; i++) {
            const exerciseId = `${skillType}_${level}_${(i + 1).toString().padStart(3, '0')}`;
            userData.data[skillType][level].data[exerciseId] = {
              lastNote: ""
            };
          }
        }
      }
    }
    
    // Si utilisateur authentifié, récupérer aussi les infos de profil
    if (isAuthenticated && userId) {
      try {
        const profileRef = doc(db, 'users', userId);
        const profileSnap = await getDoc(profileRef);
        
        if (profileSnap.exists()) {
          const profile = profileSnap.data().profile;
          userData.nativeLanguage = profile.nativeLanguage || "FR";
          userData.subscription = profile.subscription || "";
          userData.paiementInfos = profile.paiementInfos || "";
        }
      } catch (error) {
        console.warn('Erreur récupération profil utilisateur:', error);
      }
    }
    
    // Sauvegarder localement
    await this.saveLocalUserData(userData);
    
    return userData;
    
  } catch (error) {
    console.error('Erreur récupération données utilisateur plage actuelle:', error);
    throw error;
  }
}

static async fetchExerciseResultsForCurrentRange(userId, skillType, level, currentIndex, totalExercises) {
  try {
    // Calculer la plage de 50 exercices autour de l'index actuel
    const rangeStart = Math.max(0, Math.floor(currentIndex / 50) * 50);
    const rangeEnd = Math.min(totalExercises - 1, rangeStart + 49);
    
    console.log(`Récupération résultats ${skillType}_${level}: exercices ${rangeStart} à ${rangeEnd}`);
    
    // Les résultats sont stockés par batches de 1000
    // Déterminer quels batches de résultats contiennent notre plage
    const startResultBatch = Math.floor(rangeStart / 1000) + 1;
    const endResultBatch = Math.floor(rangeEnd / 1000) + 1;
    
    const exerciseResults = {};
    
    // Récupérer les batches de résultats nécessaires
    for (let batchNum = startResultBatch; batchNum <= endResultBatch; batchNum++) {
      const batchName = `${skillType}_${level}_batch_${batchNum.toString().padStart(2, '0')}`;
      
      try {
        const resultRef = doc(db, 'users', userId, 'exercise_results', batchName);
        const resultSnap = await getDoc(resultRef);
        
        if (resultSnap.exists()) {
          const batchResults = resultSnap.data();
          
          // Filtrer pour ne garder que les résultats de notre plage
          Object.entries(batchResults).forEach(([exerciseId, result]) => {
            const exerciseNum = parseInt(exerciseId.match(/\d+/)?.[0] || '0') - 1; // Index base 0
            if (exerciseNum >= rangeStart && exerciseNum <= rangeEnd) {
              exerciseResults[exerciseId] = result;
            }
          });
        }
      } catch (error) {
        console.warn(`Erreur récupération batch résultats ${batchName}:`, error);
      }
    }
    
    // Compléter avec des résultats vides pour les exercices sans résultat
    for (let i = rangeStart; i <= rangeEnd; i++) {
      const exerciseId = `${skillType}_${level}_${(i + 1).toString().padStart(3, '0')}`;
      if (!exerciseResults[exerciseId]) {
        exerciseResults[exerciseId] = {
          lastNote: ""
        };
      }
    }
    
    console.log(`${skillType}_${level}: ${Object.keys(exerciseResults).length} résultats récupérés`);
    return exerciseResults;
    
  } catch (error) {
    console.error(`Erreur récupération résultats ${skillType}_${level}:`, error);
    return {};
  }
}

// ================================
// FONCTIONS UTILITAIRES POUR LES NOUVELLES STRUCTURES
// ================================

static getDefaultLernDataStructure() {
  return {
    lesen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    hoeren: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    sprechen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    schreiben: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    grammar: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] }
  };
}

// ================================
// FONCTION POUR NAVIGUER VERS UNE NOUVELLE PLAGE
// ================================

static async loadNewExerciseRange(skillType, level, newIndex, userId = null, isAuthenticated = false) {
  try {
    console.log(`Chargement nouvelle plage pour ${skillType}_${level}, index: ${newIndex}`);
    
    // 1. Récupérer le total d'exercices pour ce skill/level
    const metadata = await this.getSkillLevelMetadata(skillType, level);
    const totalExercises = metadata?.totalCount || 0;
    
    if (totalExercises === 0) {
      console.warn(`Aucun exercice trouvé pour ${skillType}_${level}`);
      return { exercises: [], results: {} };
    }
    
    // 2. Récupérer les nouveaux exercices
    const exercises = await this.fetchExercisesForCurrentRange(skillType, level, newIndex, totalExercises);
    
    // 3. Récupérer les résultats pour cette nouvelle plage
    let exerciseResults = {};
    if (isAuthenticated && userId) {
      exerciseResults = await this.fetchExerciseResultsForCurrentRange(userId, skillType, level, newIndex, totalExercises);
    } else {
      // Utilisateur non authentifié : résultats vides
      const rangeStart = Math.max(0, Math.floor(newIndex / 50) * 50);
      const rangeEnd = Math.min(totalExercises - 1, rangeStart + 49);
      
      for (let i = rangeStart; i <= rangeEnd; i++) {
        const exerciseId = `${skillType}_${level}_${(i + 1).toString().padStart(3, '0')}`;
        exerciseResults[exerciseId] = { lastNote: "" };
      }
    }
    
    // 4. Mettre à jour l'index si utilisateur authentifié
    if (isAuthenticated && userId) {
      try {
        const summaryRef = doc(db, 'users', userId, 'skill_summaries', `${skillType}_${level}`);
        await updateDoc(summaryRef, {
          index: newIndex,
          lastUpdated: new Date()
        });
      } catch (error) {
        console.warn('Erreur mise à jour index:', error);
      }
    }
    
    return {
      exercises: exercises,
      results: exerciseResults,
      newIndex: newIndex,
      total: totalExercises
    };
    
  } catch (error) {
    console.error('Erreur chargement nouvelle plage:', error);
    throw error;
  }
}
  
  static async loadLocalData() {
    try {
      const localUserData = await this.getLocalUserData();
      const localLernData = await this.getLocalLernData();
      
      return {
        lernData: localLernData,
        userData: localUserData !== false ? localUserData : this.getDefaultUserStructure()
      };
    } catch (error) {
      console.error("Erreur chargement données locales complètes:", error);
      throw error;
    }
  }

  // ================================
  // FONCTIONS HELPER POUR fetchLernData
  // ================================

  static async getSkillLevelMetadata(skillType, level) {
    try {
      const skillLevel = `${skillType}_${level}`;
  
      
      const metadataRef = doc(db, 'exercises_content', skillLevel);
      const metadataSnap = await getDoc(metadataRef);
      
      
      
      if (metadataSnap.exists()) {
        const data = metadataSnap.data();
       
        
        // Extraire les valeurs depuis data.metadata au lieu de data directement
        const actualMetadata = data.metadata || {};
        
        return {
          skillLevel,
          totalCount: actualMetadata.totalCount || 0,
          batchCount: actualMetadata.batchCount || 0,
          batchSize: actualMetadata.batchSize || 50,
          version: actualMetadata.version,
          categories: actualMetadata.categories || [],
          last_updated: actualMetadata.last_updated,
          created_at: actualMetadata.created_at
        };
      }
      
      console.log(`❌ Aucune métadonnée trouvée pour ${skillLevel}`);
      return null;
    } catch (error) {
      console.error(`💥 Erreur récupération métadonnées ${skillType}_${level}:`, error);
      return null;
    }
  }


  static async getAllExercisesForSkillLevel(skillType, level, metadata) {
    try {
     
      const skillLevel = `${skillType}_${level}`;
      const batchCount = metadata.batchCount;

      

      if (batchCount === 0) {
        return [];
      }

      const allExercises = [];

    

      // Récupérer tous les batches pour ce skill/level
      for (let batchNum = 1; batchNum <= batchCount; batchNum++) {
        const batchName = `${skillLevel}_batch_${batchNum
          .toString()
          .padStart(2, "0")}`;
        const batchRef = doc(db, "exercise_batches", batchName);
        const batchSnap = await getDoc(batchRef);

       

        if (batchSnap.exists()) {
          const batchData = batchSnap.data();

          // Convertir chaque exercice du batch en objet avec ID
          Object.entries(batchData).forEach(([exerciseId, exerciseData]) => {
            allExercises.push({
              id: exerciseId,
              ...exerciseData,
            });
          });
        }
      }

      
      return allExercises;
    } catch (error) {
      console.error(
        `Erreur récupération exercices ${skillType}_${level}:`,
        error
      );
      return [];
    }
  }

  static async fetchLernData() {
    try {
     
  
      const skillTypes = ["lesen", "hoeren", "sprechen", "schreiben", "grammar"];
      const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
      const exercises = [];
  
      // Traiter chaque combinaison skill/level
      for (const skillType of skillTypes) {
        for (const level of levels) {
          
          
          const metadata = await this.getSkillLevelMetadata(skillType, level);
          
          if (metadata && metadata.totalCount > 0 && metadata.batchCount > 0) {
           
            const skillLevelExercises = await this.getAllExercisesForSkillLevel(skillType, level, metadata);
          
            
            // Ajouter au tableau global avec les métadonnées
            skillLevelExercises.forEach((exercise) => {
              exercises.push({
                ...exercise,
                skillType: skillType,
                level: level,
              });
            });
          }
        }
      }
  
      // console.log('Total exercises:', exercises.length);
      // console.log('All exercises:', JSON.stringify(exercises, null, 2));
  
      // IMPORTANT: Organiser les exercices avant de sauvegarder
      const organizedData = this.organizeExercisesBySkill(exercises);
      
      
      // Sauvegarder les données ORGANISÉES
      await this.saveLocalLernData(organizedData);
      // console.log("données lernnData lesen A1 :",organizedData["lesen"]["A1"])
    
      
      return organizedData; // Retourner les données organisées
      
    } catch (error) {
      console.warn("Erreur réseau, utilisation des données locales:", error);
      return this.getLocalLernData();
    }
  }

  static async fetchInitialUserData(clientId = "", organizedData) {
    try {
      console.log('Initialisation des données utilisateur...');
      
      // Structure de base de l'utilisateur
      const initialUserData = {
        clientid: clientId,
        nativeLanguage: "FR",
        subscription: "",
        paiementInfos: "",
        data: {}
      };
      
      // Parcourir tous les skills et niveaux depuis organizedData
      Object.entries(organizedData).forEach(([skillType, skillLevels]) => {
        initialUserData.data[skillType] = {};
        
        Object.entries(skillLevels).forEach(([level, exercises]) => {
          // Initialiser la structure pour ce skill/level
          initialUserData.data[skillType][level] = {
            index: 0,
            total: exercises.length,
            data: {}
          };
          
          // Initialiser chaque exercice avec lastNote vide
          exercises.forEach(exercise => {
            initialUserData.data[skillType][level].data[exercise.id] = {
              lastNote: ""
            };
          });
        });
      });
      
      // console.log(`Données initialisées pour ${clientId || 'utilisateur anonyme'}`);
      // console.log(`Total skills: ${Object.keys(initialUserData.data).length}`);

      // console.log("données userInfos lesen A1 :",initialUserData["data"]["lesen"]["A1"]["data"])
      
      // Compter le total d'exercices
      let totalExercises = 0;
      Object.values(initialUserData.data).forEach(skill => {
        Object.values(skill).forEach(level => {
          totalExercises += level.total;
        });
      });
      console.log(`Total exercices: ${totalExercises}`);
      
      // Si un clientId est fourni, sauvegarder en base
      if (clientId) {
        await this.saveInitialUserData(clientId, initialUserData);
      }
      
      // Sauvegarder aussi localement
      await this.saveLocalUserData(initialUserData);
      
      return initialUserData;
      
    } catch (error) {
      console.error('Erreur initialisation données utilisateur:', error);
      // Retourner une structure minimale en cas d'erreur
      return this.getDefaultUserStructure();
    }
  }
  
  static async saveInitialUserData(userId, userData) {
    try {
      const batch = writeBatch(db);
      
      // 1. Sauvegarder le profil
      const profileRef = doc(db, 'users', userId);
      batch.set(profileRef, {
        profile: {
          clientid: userData.clientid,
          nativeLanguage: userData.nativeLanguage,
          subscription: userData.subscription,
          paiementInfos: userData.paiementInfos,
          createdAt: new Date(),
          lastSync: new Date()
        }
      });
      
      // 2. Sauvegarder les résumés par skill/level
      Object.entries(userData.data).forEach(([skillType, skillLevels]) => {
        Object.entries(skillLevels).forEach(([level, levelData]) => {
          const summaryRef = doc(db, 'users', userId, 'skill_summaries', `${skillType}_${level}`);
          batch.set(summaryRef, {
            index: levelData.index,
            total: levelData.total,
            createdAt: new Date()
          });
        });
      });
      
      // 3. Sauvegarder les résultats d'exercices par batches
      Object.entries(userData.data).forEach(([skillType, skillLevels]) => {
        Object.entries(skillLevels).forEach(([level, levelData]) => {
          const exerciseIds = Object.keys(levelData.data);
          
          // Diviser en batches de 1000
          const batchSize = 1000;
          for (let i = 0; i < exerciseIds.length; i += batchSize) {
            const batchNumber = Math.floor(i / batchSize) + 1;
            const batchName = `${skillType}_${level}_batch_${batchNumber.toString().padStart(2, '0')}`;
            
            const batchData = {};
            const batchIds = exerciseIds.slice(i, i + batchSize);
            
            batchIds.forEach(exerciseId => {
              batchData[exerciseId] = levelData.data[exerciseId];
            });
            
            const resultRef = doc(db, 'users', userId, 'exercise_results', batchName);
            batch.set(resultRef, batchData);
          }
        });
      });
      
      await batch.commit();
      console.log('Données utilisateur initiales sauvegardées en Firestore');
      
    } catch (error) {
      console.error('Erreur sauvegarde données initiales:', error);
      throw error;
    }
  }
  
  static getDefaultUserStructure() {
    return {
      clientid: "",
      nativeLanguage: "FR", 
      subscription: "",
      paiementInfos: "",
      data: {
        lesen: { A1: {index: 0, total: 0, data: {}}, A2: {index: 0, total: 0, data: {}}, B1: {index: 0, total: 0, data: {}}, B2: {index: 0, total: 0, data: {}}, C1: {index: 0, total: 0, data: {}}, C2: {index: 0, total: 0, data: {}} },
        hoeren: { A1: {index: 0, total: 0, data: {}}, A2: {index: 0, total: 0, data: {}}, B1: {index: 0, total: 0, data: {}}, B2: {index: 0, total: 0, data: {}}, C1: {index: 0, total: 0, data: {}}, C2: {index: 0, total: 0, data: {}} },
        sprechen: { A1: {index: 0, total: 0, data: {}}, A2: {index: 0, total: 0, data: {}}, B1: {index: 0, total: 0, data: {}}, B2: {index: 0, total: 0, data: {}}, C1: {index: 0, total: 0, data: {}}, C2: {index: 0, total: 0, data: {}} },
        schreiben: { A1: {index: 0, total: 0, data: {}}, A2: {index: 0, total: 0, data: {}}, B1: {index: 0, total: 0, data: {}}, B2: {index: 0, total: 0, data: {}}, C1: {index: 0, total: 0, data: {}}, C2: {index: 0, total: 0, data: {}} },
        grammar: { A1: {index: 0, total: 0, data: {}}, A2: {index: 0, total: 0, data: {}}, B1: {index: 0, total: 0, data: {}}, B2: {index: 0, total: 0, data: {}}, C1: {index: 0, total: 0, data: {}}, C2: {index: 0, total: 0, data: {}} }
      }
    };
  }
  
  // Mise à jour de la fonction principale pour intégrer l'initialisation
  static async fetchUserData(clientId = null, organizedData = null, isAuthenticated = false) {
    try {
      console.log(`Récupération données utilisateur - Auth: ${isAuthenticated}, ClientId: ${clientId || 'none'}`);
      
      // Récupérer les données d'auth stockées si pas de clientId fourni
      let effectiveClientId = clientId;
     
      
      // CAS 1: Utilisateur authentifié - récupérer depuis Firebase
      if (isAuthenticated && effectiveClientId) {
        console.log('Utilisateur authentifié - récupération depuis Firebase...');
        
        try {
          return await this.fetchExistingUserData(effectiveClientId);
        } catch (error) {
          console.warn('Erreur Firebase, tentative données locales...', error);
          const localData = await this.getLocalUserData();
          if (localData !== false) {
            return localData;
          }
          throw error;
        }
      }
      
      // CAS 2: Utilisateur non authentifié - vérifier données locales
      const localData = await this.getLocalUserData();
      if (localData !== false) {
        console.log('Données locales trouvées');
        return localData;
      }
      
      // CAS 3: Première utilisation - initialiser
      console.log('Première utilisation - initialisation...');
      
      if (!organizedData) {
        console.log('Récupération des exercices pour initialisation...');
        organizedData = await this.fetchLernData();
      }
      
      return await this.fetchInitialUserData(effectiveClientId || "", organizedData);
      
    } catch (error) {
      console.error('Erreur récupération données utilisateur:', error);
      return this.getDefaultUserStructure();
    }
  }


  static async fetchExistingUserData(userId) {
    try {

      // Récupérer le profil
      const profileRef = doc(db, 'users', userId);
      const profileSnap = await getDoc(profileRef);
      
      if (!profileSnap.exists()) {
        throw new Error('Utilisateur introuvable en base');
      }
      
      const profile = profileSnap.data().profile;
      
      // Récupérer tous les résumés
      const summariesRef = collection(db, 'users', userId, 'skill_summaries');
      const summariesSnap = await getDocs(summariesRef);
      
      // Récupérer tous les résultats d'exercices
      const resultsRef = collection(db, 'users', userId, 'exercise_results');
      const resultsSnap = await getDocs(resultsRef);
      
      // Reconstruire la structure
      const data = this.getDefaultUserStructure().data;
      
      // Remplir avec les résumés
      summariesSnap.forEach(doc => {
        const [skill, level] = doc.id.split('_');
        if (data[skill] && data[skill][level]) {
          const summary = doc.data();
          data[skill][level].index = summary.index;
          data[skill][level].total = summary.total;
        }
      });
      
      // Remplir avec les résultats
      resultsSnap.forEach(doc => {
        const [skill, level] = doc.id.split('_').slice(0, 2);
        if (data[skill] && data[skill][level]) {
          const exerciseResults = doc.data();
          Object.assign(data[skill][level].data, exerciseResults);
        }
      });
      
      const userData = {
        clientid: profile.clientid,
        nativeLanguage: profile.nativeLanguage,
        subscription: profile.subscription,
        paiementInfos: profile.paiementInfos,
        data: data
      };
      
      // Sauvegarder localement
      await this.saveLocalUserData(userData);

      // console.log("Données d'utilisateurs trouvées en ligne et mis à jours :",userData)
      
      return userData;
      
    } catch (error) {
      console.error('Erreur récupération utilisateur existant:', error);
      throw error;
    }
  }


  // ================================
// SYNCHRONISATION UTILISATEUR AUTHENTIFIÉ
// ================================

static async syncUserDataBySigningUp(userId, userProfileData, localUserData) {
  try {
    console.log(`Synchronisation des données pour l'utilisateur: ${userId}`);
    
    const batch = writeBatch(db);
    
    // 1. Créer/Mettre à jour le profil utilisateur
    const profileRef = doc(db, 'users', userId);
    const profileData = {
      clientid: userId,
      nativeLanguage: userProfileData.nativeLanguage || localUserData?.nativeLanguage || 'FR',
      subscription: userProfileData.subscription || localUserData?.subscription || '',
      paiementInfos: userProfileData.paiementInfos || localUserData?.paiementInfos || '',
      email: userProfileData.email,
      displayName: userProfileData.displayName,
      createdAt: userProfileData.createdAt || new Date(),
      lastSync: new Date()
    };
    
    batch.set(profileRef, { profile: profileData });
    
    // 2. Synchroniser les données de progression si elles existent localement
    if (localUserData && localUserData.data) {
      await this.syncUserOnlineProgressData(batch, userId, localUserData.data);
    }
    
    

    // 3. Exécuter toutes les opérations
    await batch.commit();
    
    console.log('Synchronisation utilisateur terminée avec succès');
    
    // 4. Retourner les données utilisateur au format attendu par l'app
    const syncedUserData = {
      clientid: userId,
      nativeLanguage: profileData.nativeLanguage,
      subscription: profileData.subscription,
      paiementInfos: profileData.paiementInfos,
      data: localUserData?.data || this.getDefaultUserStructure().data,
      currentSession: {}
    };
    
    // 5. Sauvegarder localement
    await this.saveLocalUserData(syncedUserData);
    
    return {
      success: true,
      userData: syncedUserData
    };
    
  } catch (error) {
    console.error('Erreur synchronisation utilisateur authentifié:', error);
    return {
      success: false,
      error: error.message
    };
  }
}





static async syncAuthenticatedUserLocalDataBySigningIn(userId) {
  try {
    console.log(`Récupération des données en ligne pour: ${userId} (limite 50 par skill_level)`);

    // 1. Initialiser les index utilisateur depuis Firebase
    console.log('Récupération des index utilisateur depuis Firebase...');
    const userDataIndexes = await this.initializeUserDataIndexes(userId, true);
    
    // 2. Récupérer les 50 exercices correspondant aux index
    console.log('Récupération des exercices pour les index actuels...');
    const lernData = await this.fetchCurrentRangeLernData(userDataIndexes);
    
    // 3. Récupérer les données utilisateur complètes avec résultats
    console.log('Récupération des données utilisateur avec résultats...');
    const userData = await this.fetchCurrentRangeUserData(userDataIndexes, userId, true);

    // 4. Préparer les données finales avec session vide
    const finalUserData = {
      ...userData,
      currentSession: {}
    };

    // 5. Sauvegarder localement (remplace complètement les données locales)
    await this.saveLocalUserData(finalUserData);
    await this.saveLocalLernData(lernData);
    
    // 6. Mettre à jour la date de dernière synchronisation
    const profileRef = doc(db, 'users', userId);
    await updateDoc(profileRef, { 'profile.lastSync': new Date() });
    
    console.log('Synchronisation terminée - 50 exercices par skill_level chargés');
    
    return {
      success: true,
      userData: finalUserData,
      lernData: lernData
    };
    
  } catch (error) {
    console.error('Erreur récupération données en ligne:', error);
    
    // Fallback : essayer de créer un nouvel utilisateur avec les données actuelles
    try {
      console.log('Tentative d\'initialisation nouvel utilisateur...');
      
      const userDataIndexes = await this.initializeUserDataIndexes(userId, false);
      const lernData = await this.fetchCurrentRangeLernData(userDataIndexes);
      const userData = await this.fetchCurrentRangeUserData(userDataIndexes, userId, false);
      
      // Créer le profil en ligne
      await this.createUserProfileOnline(userId, userData);
      
      const finalUserData = {
        ...userData,
        currentSession: {}
      };
      
      await this.saveLocalUserData(finalUserData);
      await this.saveLocalLernData(lernData);
      
      return {
        success: true,
        userData: finalUserData,
        lernData: lernData
      };
      
    } catch (fallbackError) {
      console.error('Erreur fallback:', fallbackError);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// ================================
// FONCTION POUR CRÉER UN PROFIL UTILISATEUR EN LIGNE
// ================================

static async createUserProfileOnline(userId, userData) {
  try {
    console.log(`Création profil utilisateur en ligne: ${userId}`);
    
    const batch = writeBatch(db);
    
    // 1. Créer le profil utilisateur
    const profileRef = doc(db, 'users', userId);
    const profileData = {
      clientid: userId,
      nativeLanguage: userData.nativeLanguage || 'FR',
      subscription: userData.subscription || '',
      paiementInfos: userData.paiementInfos || '',
      createdAt: new Date(),
      lastSync: new Date()
    };
    
    batch.set(profileRef, { profile: profileData });
    
    // 2. Créer les résumés par skill/level avec index à 0
    Object.entries(userData.data).forEach(([skillType, skillLevels]) => {
      Object.entries(skillLevels).forEach(([level, levelData]) => {
        const summaryRef = doc(db, 'users', userId, 'skill_summaries', `${skillType}_${level}`);
        batch.set(summaryRef, {
          index: 0, // Nouvel utilisateur commence à 0
          total: levelData.total,
          createdAt: new Date()
        });
      });
    });
    
    // 3. Créer les batches de résultats vides pour la première plage (0-49)
    Object.entries(userData.data).forEach(([skillType, skillLevels]) => {
      Object.entries(skillLevels).forEach(([level, levelData]) => {
        if (levelData.total > 0) {
          const batchName = `${skillType}_${level}_batch_01`; // Premier batch de résultats
          const resultRef = doc(db, 'users', userId, 'exercise_results', batchName);
          
          // Créer les résultats vides pour les 50 premiers exercices
          const batchData = {};
          const maxExercises = Math.min(50, levelData.total);
          
          for (let i = 0; i < maxExercises; i++) {
            const exerciseId = `${skillType}_${level}_${(i + 1).toString().padStart(3, '0')}`;
            batchData[exerciseId] = { lastNote: "" };
          }
          
          batch.set(resultRef, batchData);
        }
      });
    });
    
    await batch.commit();
    console.log('Profil utilisateur créé avec succès en ligne');
    
  } catch (error) {
    console.error('Erreur création profil utilisateur:', error);
    throw error;
  }
}

// ================================
// FONCTION POUR METTRE À JOUR VERS UNE NOUVELLE PLAGE APRÈS CONNEXION
// ================================

static async updateToNewRangeAfterSignIn(userId, skillType, level, targetIndex) {
  try {
    console.log(`Mise à jour vers nouvelle plage après connexion: ${skillType}_${level}, index: ${targetIndex}`);
    
    // 1. Charger la nouvelle plage d'exercices et résultats
    const rangeData = await this.loadNewExerciseRange(skillType, level, targetIndex, userId, true);
    
    // 2. Mettre à jour les données locales
    const localUserData = await this.getLocalUserData();
    const localLernData = await this.getLocalLernData();
    
    if (localUserData && localLernData) {
      // Mettre à jour userData
      localUserData.data[skillType][level] = {
        index: rangeData.newIndex,
        total: rangeData.total,
        data: rangeData.results
      };
      
      // Mettre à jour lernData
      localLernData[skillType][level] = rangeData.exercises;
      
      // Sauvegarder localement
      await this.saveLocalUserData(localUserData);
      await this.saveLocalLernData(localLernData);
      
      console.log(`Plage mise à jour localement pour ${skillType}_${level}`);
      
      return {
        success: true,
        userData: localUserData,
        lernData: localLernData
      };
    }
    
    throw new Error('Données locales non trouvées');
    
  } catch (error) {
    console.error('Erreur mise à jour plage après connexion:', error);
    return {
      success: false,
      error: error.message
    };
  }
}



static async syncAuthenticatedUserProgressionData(userId) {
  try {
    console.log(`Synchronisation automatique régulière des données pour l'utilisateur: ${userId}`);

    //1.Récupérer les données locales d'utilisateurs

    const localUserData=await FirebaseDataService.getLocalUserData()


    if(!userId || !localUserData){
      console.log("Utilisateur non connecté ou manque de données ")
      return}


    
    const batch = writeBatch(db);
    

    
    // 2. Synchroniser les données de progression si elles existent localement
    if (localUserData && localUserData.data) {
      await this.syncUserOnlineProgressData(batch, userId, localUserData.data);
      console.log("Données a envoyer de lesen A1:",localUserData.data["lesen"]["A1"])
    } else{
      console.log("Problèmes :",localUserData)
      return
    }
    
    //3. Synchroniser l'actualisation des données 

    const profileRef = doc(db, 'users', userId);
      batch.update(profileRef, { 
    'profile.lastSync': new Date() 
      });
    // 3. Exécuter toutes les opérations
    await batch.commit();
    
    console.log('Synchronisation automatique régulière terminée avec succès');
    
    // 4. Retourner les données utilisateur au format attendu par l'app
    
    
    return {
      success: true
    };
    
  } catch (error) {
    console.error('Erreur synchronisation utilisateur authentifié:', error);
    return {
      success: false,
      error: error.message
    };
  }
}



static async syncUserOnlineProgressData(batch, userId, progressData) {
  try {
    Object.entries(progressData).forEach(([skillType, skillLevels]) => {
      Object.entries(skillLevels).forEach(([level, levelData]) => {
        // Créer le résumé pour ce skill/level
        const summaryRef = doc(db, 'users', userId, 'skill_summaries', `${skillType}_${level}`);
        batch.set(summaryRef, {
          index: levelData.index || 0,
          total: levelData.total || 0,
          lastUpdated: new Date()
        });
        
        // Traiter les résultats d'exercices par batches
        if (levelData.data && Object.keys(levelData.data).length > 0) {
          this.processBatchedExerciseResults(batch, userId, skillType, level, levelData.data);
        }
      });
    });
  } catch (error) {
    console.error('Erreur synchronisation données de progression:', error);
    throw error;
  }
}

static processBatchedExerciseResults(batch, userId, skillType, level, exerciseData) {
  const exerciseIds = Object.keys(exerciseData);
  const batchSize = 1000;
  
  // Diviser en batches de 1000 exercices
  for (let i = 0; i < exerciseIds.length; i += batchSize) {
    const batchNumber = Math.floor(i / batchSize) + 1;
    const batchName = `${skillType}_${level}_batch_${batchNumber.toString().padStart(2, '0')}`;
    
    const batchData = {};
    const batchIds = exerciseIds.slice(i, i + batchSize);
    
    batchIds.forEach(exerciseId => {
      batchData[exerciseId] = exerciseData[exerciseId];
    });
    
    const resultRef = doc(db, 'users', userId, 'exercise_results', batchName);
    batch.set(resultRef, batchData, { merge: true });
  }
}

// Fonction pour récupérer les données utilisateur après authentification
static async fetchAuthenticatedUserData(userId) {
  try {
    console.log(`Récupération données utilisateur authentifié: ${userId}`);
    
    // Vérifier si l'utilisateur existe déjà en base
    const profileRef = doc(db, 'users', userId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      // Utilisateur existant - récupérer ses données complètes
      return await this.fetchExistingUserData(userId);
    } else {
      // Nouvel utilisateur - initialiser avec les exercices disponibles
      console.log('Nouvel utilisateur authentifié - initialisation...');
      const organizedData = await this.fetchLernData();
      return await this.fetchInitialUserData(userId, organizedData);
    }
    
  } catch (error) {
    console.error('Erreur récupération utilisateur authentifié:', error);
    throw error;
  }
}

// Fonction utilitaire pour fusionner données locales et serveur
static mergeUserDataSources(serverData, localData) {
  if (!localData || !localData.data) {
    return serverData;
  }
  
  // Fusionner les données en privilégiant les données serveur pour les résultats
  // mais en gardant les sessions locales
  return {
    ...serverData,
    currentSession: localData.currentSession || {}
  };
}

  
  
  static async updateExerciseResult(userId, skillType, level, exerciseId, score) {
    try {
      // 1. Déterminer le batch pour cet exercice (groupes de 1000)
      const exerciseNumber = parseInt(exerciseId.match(/\d+/)?.[0] || '1');
      const batchNumber = Math.ceil(exerciseNumber / 1000);
      const batchName = `${skillType}_${level}_batch_${batchNumber.toString().padStart(2, '0')}`;
      
      // 2. Mettre à jour le résultat dans le batch approprié
      const resultRef = doc(db, 'users', userId, 'exercise_results', batchName);
      await setDoc(resultRef, {
        [exerciseId]: { lastNote: score }
      }, { merge: true });
      
      // 3. Mettre à jour le résumé du skill/level
      const summaryRef = doc(db, 'users', userId, 'skill_summaries', `${skillType}_${level}`);
      const summarySnap = await getDoc(summaryRef);
      
      let summaryData = { index: 0, total: 0 };
      if (summarySnap.exists()) {
        summaryData = summarySnap.data();
      }
      
      // Recalculer l'index si nécessaire
      if (score >= 70) { // Seuil de réussite
        summaryData.index = Math.max(summaryData.index, exerciseNumber);
      }
      
      summaryData.lastUpdated = new Date();
      
      await setDoc(summaryRef, summaryData);
      
      return { success: true };
    } catch (error) {
      console.error('Erreur mise à jour exercice:', error);
      throw error;
    }
  }







  // static async createNewUser(clientId) {
  //   try {
  //     const defaultUserData = {
  //       clientid: clientId,
  //       nativeLanguage: "FR", // Langue par défaut
  //       subscription: "free",
  //       createdAt: new Date().toISOString(),
  //       lastSync: new Date().toISOString(),
  //       data: {
  //         lesen: { A1: {}, A2: {}, B1: {}, B2: {}, C1: {}, C2: {} },
  //         horen: { A1: {}, A2: {}, B1: {}, B2: {}, C1: {}, C2: {} },
  //         sprechen: { A1: {}, A2: {}, B1: {}, B2: {}, C1: {}, C2: {} },
  //         schreiben: { A1: {}, A2: {}, B1: {}, B2: {}, C1: {}, C2: {} },
  //       },
  //       currentSession: {},
  //     };

  //     const userRef = doc(db, "users", clientId);
  //     await setDoc(userRef, defaultUserData);

  //     await this.saveLocalUserData(defaultUserData);
  //     return defaultUserData;
  //   } catch (error) {
  //     console.error("Erreur création utilisateur:", error);
  //     throw error;
  //   }
  // }

  // ================================
  // MÉTHODES DE SYNCHRONISATION
  // ================================

  static async syncUserProgress(userData) {
    try {
      const userRef = doc(db, "users", userData.clientid);

      const updateData = {
        nativeLanguage: userData.nativeLanguage,
        subscription: userData.subscription,
        data: userData.data,
        lastSync: new Date().toISOString(),
      };

      await updateDoc(userRef, updateData);

      // Marquer comme synchronisé localement
      await this.markAsSynced(userData.clientid);

      return { success: true, data: updateData };
    } catch (error) {
      console.error("Erreur lors de la synchronisation:", error);

      // Marquer pour synchronisation ultérieure
      await this.markPendingSync(userData);

      return { success: false, error: error.message };
    }
  }

  static async syncExerciseResult(
    clientId,
    skillType,
    level,
    exerciseId,
    result
  ) {
    try {
      // Créer une référence pour le résultat d'exercice
      const resultRef = doc(
        db,
        "exercise_results",
        `${clientId}_${exerciseId}_${Date.now()}`
      );

      const resultData = {
        userId: clientId,
        skillType,
        level,
        exerciseId,
        score: result.percentage,
        completedAt: new Date().toISOString(),
        detailedResults: result.detailedResults,
      };

      await setDoc(resultRef, resultData);

      // Mettre à jour aussi les données utilisateur
      const userRef = doc(db, "users", clientId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Mettre à jour les statistiques dans les données utilisateur
        if (!userData.data[skillType]) {
          userData.data[skillType] = {};
        }
        if (!userData.data[skillType][level]) {
          userData.data[skillType][level] = {};
        }
        if (!userData.data[skillType][level][exerciseId]) {
          userData.data[skillType][level][exerciseId] = {};
        }

        userData.data[skillType][level][exerciseId] = {
          ...userData.data[skillType][level][exerciseId],
          lastScore: result.percentage,
          completedAt: new Date().toISOString(),
          attempts:
            (userData.data[skillType][level][exerciseId].attempts || 0) + 1,
        };

        await updateDoc(userRef, { data: userData.data });
      }

      return resultData;
    } catch (error) {
      console.error("Erreur sync résultat exercice:", error);
      // Stocker en local pour sync ultérieure
      await this.queueResultForSync(
        clientId,
        skillType,
        level,
        exerciseId,
        result
      );
      throw error;
    }
  }

  // ================================
  // MÉTHODES SPÉCIFIQUES FIREBASE
  // ================================

  static async getExercisesBySkillAndLevel(skillType, level) {
    try {
      const exercisesRef = collection(db, "exercises");
      const q = query(
        exercisesRef,
        where("skillType", "==", skillType),
        where("level", "==", level)
      );

      const snapshot = await getDocs(q);
      const exercises = [];

      snapshot.forEach((doc) => {
        exercises.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return exercises;
    } catch (error) {
      console.error("Erreur récupération exercices:", error);
      return [];
    }
  }

  static async getUserProgress(clientId, skillType = null, level = null) {
    try {
      const userRef = doc(db, "users", clientId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return null;
      }

      const userData = userSnap.data();

      if (skillType && level) {
        return userData.data[skillType]?.[level] || {};
      } else if (skillType) {
        return userData.data[skillType] || {};
      } else {
        return userData.data || {};
      }
    } catch (error) {
      console.error("Erreur récupération progrès:", error);
      return null;
    }
  }

  // ================================
  // GESTION HORS LIGNE
  // ================================

  static async saveLocalLernData(data) {
    try {
      await AsyncStorage.setItem("lernData", JSON.stringify(data));
      await AsyncStorage.setItem(
        "lernDataLastUpdate",
        new Date().toISOString()
      );
    } catch (error) {
      console.error("Erreur sauvegarde données apprentissage:", error);
    }
  }

  static async getLocalLernData() {
    try {
      const data = await AsyncStorage.getItem("lernData");

      if (data) {
        return JSON.parse(data);
      }

      // Fallback vers les constantes
      // const { Fahigkeiten } = await import(
      //   "../data/constantsProvisories/Constants"
      // );
      // return Fahigkeiten;
    } catch (error) {
      console.error("Erreur lecture données locales:", error);
      // const { Fahigkeiten } = await import(
      //   "../data/constantsProvisories/Constants"
      // );
      // return Fahigkeiten;
    }
  }

  static async saveLocalUserData(userData) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("lastSync", new Date().toISOString());
    } catch (error) {
      console.error("Erreur sauvegarde locale:", error);
    }
  }




  static async getLocalUserData() {
    try {
      const data = await AsyncStorage.getItem("userData");
      
      if (data) {
        const parsedData = JSON.parse(data);
        // Vérifier que ce sont de vraies données utilisateur avec des exercices
        if (parsedData.clientid && parsedData.data && 
            Object.keys(parsedData.data).some(skill => 
              Object.values(parsedData.data[skill]).some(level => level.total > 0)
            )) {
          return parsedData;
        }
      }
      
      // Aucune donnée utilisateur réelle stockée
      return false;
    } catch (error) {
      console.error("Erreur lecture données locales:", error);
      return false;
    }
  }
  
  // Nouvelle fonction pour récupérer les infos d'auth stockées
  // static async getStoredAuthData() {
  //   try {
  //     const authData = await AsyncStorage.getItem('user');
  //     if (authData) {
  //       return JSON.parse(authData);
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error('Erreur lecture données auth:', error);
  //     return null;
  //   }
  // }



  static async markPendingSync(userData) {
    try {
      const pendingSync = (await AsyncStorage.getItem("pendingSync")) || "[]";
      const pending = JSON.parse(pendingSync);

      pending.push({
        type: "userProgress",
        data: userData,
        timestamp: Date.now(),
      });

      await AsyncStorage.setItem("pendingSync", JSON.stringify(pending));
    } catch (error) {
      console.error("Erreur marquage sync en attente:", error);
    }
  }

  static async queueResultForSync(
    clientId,
    skillType,
    level,
    exerciseId,
    result
  ) {
    try {
      const pendingResults =
        (await AsyncStorage.getItem("pendingResults")) || "[]";
      const pending = JSON.parse(pendingResults);

      pending.push({
        clientId,
        skillType,
        level,
        exerciseId,
        result,
        timestamp: Date.now(),
      });

      await AsyncStorage.setItem("pendingResults", JSON.stringify(pending));
    } catch (error) {
      console.error("Erreur mise en file résultat:", error);
    }
  }

  static async processPendingSync() {
    try {
      // Traiter les synchronisations utilisateur en attente
      const pendingSync = await AsyncStorage.getItem("pendingSync");
      if (pendingSync) {
        const pending = JSON.parse(pendingSync);
        const processed = [];

        for (const item of pending) {
          try {
            if (item.type === "userProgress") {
              await this.syncUserProgress(item.data);
              processed.push(item);
            }
          } catch (error) {
            console.error("Erreur traitement sync en attente:", error);
          }
        }

        const remaining = pending.filter((item) => !processed.includes(item));
        await AsyncStorage.setItem("pendingSync", JSON.stringify(remaining));
      }

      // Traiter les résultats d'exercices en attente
      const pendingResults = await AsyncStorage.getItem("pendingResults");
      if (pendingResults) {
        const pending = JSON.parse(pendingResults);
        const processed = [];

        for (const item of pending) {
          try {
            await this.syncExerciseResult(
              item.clientId,
              item.skillType,
              item.level,
              item.exerciseId,
              item.result
            );
            processed.push(item);
          } catch (error) {
            console.error("Erreur traitement résultat en attente:", error);
          }
        }

        const remaining = pending.filter((item) => !processed.includes(item));
        await AsyncStorage.setItem("pendingResults", JSON.stringify(remaining));
      }
    } catch (error) {
      console.error("Erreur traitement sync en attente:", error);
    }
  }

  // ================================
  // MÉTHODES UTILITAIRES
  // ================================

  static organizeExercisesBySkill(exercises) {
    // Initialiser la structure organisée
    const organized = {
      lesen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      hoeren: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      sprechen: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      schreiben: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
      grammar: { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] },
    };

    // Organiser chaque exercice selon son skillType et level
    exercises.forEach((exercise) => {
      const skillType = exercise.skillType || "lesen"; // Fallback vers 'lesen'
      const level = exercise.level || "A1"; // Fallback vers 'A1'

      // Vérifier que les propriétés existent dans la structure
      if (organized[skillType] && organized[skillType][level]) {
        organized[skillType][level].push(exercise);
      } else {
        console.warn(
          `Structure non reconnue: ${skillType}_${level} pour l'exercice ${
            exercise.id || "unknown"
          }`
        );
      }
    });

    // Afficher un résumé de l'organisation
    Object.entries(organized).forEach(([skillType, levels]) => {
      const totalExercises = Object.values(levels).flat().length;
      if (totalExercises > 0) {
        console.log(`${skillType}: ${totalExercises} exercices répartis`);
      }
    });

    return organized;
  }

  static async checkNetworkConnection() {
    try {
      // Test simple avec Firestore
      const testRef = doc(db, "health", "check");
      await getDoc(testRef);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async markAsSynced(clientId) {
    try {
      await AsyncStorage.setItem(
        `synced_${clientId}`,
        new Date().toISOString()
      );
    } catch (error) {
      console.error("Erreur marquage sync:", error);
    }
  }

  // static async loadLocalData() {
  //   const { Fahigkeiten, userInfos } = await import(
  //     "../data/constantsProvisories/Constants"
  //   );

  //   // console.log("données lernnData lesen A1 :",Fahigkeiten["lesen"]["A1"])
  //   // console.log("données userInfos lesen A1 :",userInfos["data"]["lesen"]["A1"]["data"])

  //   return {
  //     lernData: Fahigkeiten,
  //     userData: { ...userInfos, currentSession: {} },
  //   };
  // }
}
