import { useState, useCallback, useEffect } from 'react';
import { useUserData } from '../context/AppDataContext';
import { DataService } from '../services/DataService';

export const useSyncData = () => {
  const { userData, userDispatch } = useUserData();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [syncError, setSyncError] = useState(null);

  // Synchronisation manuelle
  const syncNow = useCallback(async () => {
    if (!userData.clientid) {
      setSyncError('Aucun client ID disponible');
      return false;
    }

    try {
      setIsSyncing(true);
      setSyncError(null);

      const result = await DataService.syncUserProgress(userData);
      
      if (result.success) {
        setLastSyncTime(new Date());
        
        // Traiter les synchronisations en attente
        await DataService.processPendingSync();
        
        return true;
      } else {
        setSyncError(result.error);
        return false;
      }
    } catch (error) {
      setSyncError(error.message);
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [userData]);

  // Synchronisation automatique en arrière-plan
  const autoSync = useCallback(async () => {
    if (await DataService.checkNetworkConnection()) {
      await syncNow();
    }
  }, [syncNow]);

  // Synchronisation périodique (toutes les 5 minutes)
  useEffect(() => {
    const interval = setInterval(autoSync, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoSync]);

  // Synchronisation au focus de l'app
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        autoSync();
      }
    };

    const { AppState } = require('react-native');
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => subscription?.remove();
  }, [autoSync]);

  return {
    syncNow,
    isSyncing,
    lastSyncTime,
    syncError,
    clearSyncError: () => setSyncError(null)
  };
};
