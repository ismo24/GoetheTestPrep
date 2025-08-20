export class DataService {
  // Configuration de base
  static BASE_URL = 'https://votre-api.com/api'; // Remplacez par votre URL
  static API_KEY = 'votre-api-key'; // Si vous utilisez une clé API

  // ================================
  // MÉTHODES DE CHARGEMENT INITIAL
  // ================================

  static async loadInitialData(clientId = null) {
    try {
      const [lernDataResponse, userDataResponse] = await Promise.all([
        this.fetchLernData(),
        this.fetchUserData(clientId)
      ]);

      return {
        lernData: lernDataResponse,
        userData: userDataResponse
      };
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // Fallback vers les données locales en cas d'erreur réseau
      return this.loadLocalData();
    }
  }

  static async fetchLernData() {
    try {
      const response = await fetch(`${this.BASE_URL}/content/exercises`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Erreur réseau, utilisation des données locales:', error);
      // Fallback vers vos données Fahigkeiten existantes
      const { Fahigkeiten } = await import('../data/constantsProvisories/Constants');
      return Fahigkeiten;
    }
  }

  static async fetchUserData(clientId) {
    try {
      if (!clientId) {
        // Utiliser les données locales si pas de clientId
        return this.getLocalUserData();
      }

      const response = await fetch(`${this.BASE_URL}/users/${clientId}/progress`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      
      // Sauvegarder en local pour usage hors ligne
      await this.saveLocalUserData(userData);
      
      return userData;
    } catch (error) {
      console.warn('Erreur réseau, utilisation des données locales:', error);
      return this.getLocalUserData();
    }
  }

  // ================================
  // MÉTHODES DE SYNCHRONISATION
  // ================================

  static async syncUserProgress(userData) {
    try {
      const response = await fetch(`${this.BASE_URL}/users/${userData.clientid}/progress`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nativeLanguage: userData.nativeLanguage,
          subscription: userData.subscription,
          data: userData.data,
          lastSync: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Marquer comme synchronisé
      await this.markAsSynced(userData.clientid);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      
      // Marquer pour synchronisation ultérieure
      await this.markPendingSync(userData);
      
      return { success: false, error: error.message };
    }
  }

  static async syncExerciseResult(clientId, skillType, level, exerciseId, result) {
    try {
      const response = await fetch(`${this.BASE_URL}/users/${clientId}/exercises/${exerciseId}/result`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillType,
          level,
          exerciseId,
          score: result.percentage,
          completedAt: new Date().toISOString(),
          detailedResults: result.detailedResults
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur sync résultat exercice:', error);
      // Stocker en local pour sync ultérieure
      await this.queueResultForSync(clientId, skillType, level, exerciseId, result);
      throw error;
    }
  }

  // ================================
  // GESTION HORS LIGNE
  // ================================

  static async saveLocalUserData(userData) {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('lastSync', new Date().toISOString());
    } catch (error) {
      console.error('Erreur sauvegarde locale:', error);
    }
  }

  static async getLocalUserData() {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const data = await AsyncStorage.getItem('userData');
      
      if (data) {
        return JSON.parse(data);
      }
      
      // Fallback vers les données par défaut
      const { userInfos } = await import('../data/constantsProvisories/Constants');
      return { ...userInfos, currentSession: {} };
    } catch (error) {
      console.error('Erreur lecture données locales:', error);
      const { userInfos } = await import('../data/constantsProvisories/Constants');
      return { ...userInfos, currentSession: {} };
    }
  }

  static async markPendingSync(userData) {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const pendingSync = await AsyncStorage.getItem('pendingSync') || '[]';
      const pending = JSON.parse(pendingSync);
      
      pending.push({
        type: 'userProgress',
        data: userData,
        timestamp: Date.now()
      });
      
      await AsyncStorage.setItem('pendingSync', JSON.stringify(pending));
    } catch (error) {
      console.error('Erreur marquage sync en attente:', error);
    }
  }

  static async processPendingSync() {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const pendingSync = await AsyncStorage.getItem('pendingSync');
      
      if (!pendingSync) return;
      
      const pending = JSON.parse(pendingSync);
      const processed = [];
      
      for (const item of pending) {
        try {
          if (item.type === 'userProgress') {
            await this.syncUserProgress(item.data);
            processed.push(item);
          }
        } catch (error) {
          console.error('Erreur traitement sync en attente:', error);
        }
      }
      
      // Supprimer les éléments traités
      const remaining = pending.filter(item => !processed.includes(item));
      await AsyncStorage.setItem('pendingSync', JSON.stringify(remaining));
      
    } catch (error) {
      console.error('Erreur traitement sync en attente:', error);
    }
  }

  // ================================
  // MÉTHODES UTILITAIRES
  // ================================

  static async checkNetworkConnection() {
    try {
      const response = await fetch(`${this.BASE_URL}/health`, {
        method: 'HEAD',
        timeout: 5000
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  static async loadLocalData() {
    const { Fahigkeiten, userInfos } = await import('../data/constantsProvisories/Constants');
    return {
      lernData: Fahigkeiten,
      userData: { ...userInfos, currentSession: {} }
    };
  }
}
