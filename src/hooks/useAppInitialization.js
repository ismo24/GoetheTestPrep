import { useCallback, useEffect, useState, useRef } from "react"; // Ajouter useRef
import { AppState } from "react-native"; // Nouvel import
import { useLernData, useUserData } from "../context/AppDataContext";
import { useAuth } from "./useAuth";
import { FirebaseDataService } from "../services/DataService";

export const useAppInitialization = () => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  const { lernData, lernDispatch } = useLernData();
  const { userData, userDispatch } = useUserData();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOUVEAUX ÉTATS À AJOUTER :
  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState);

  const loadData = useCallback(async () => {
    try {

      async function initialiseDatabase() {
        setIsLoading(true);
        setError(null);

        if (authLoading) {
          return;
        }
        if (lernData.hasOwnProperty('lesen') && Object.keys(lernData.lesen).length === 0) {
          console.log("Initialisation de l'application...");
          const { lernData, userData } =  await FirebaseDataService.loadInitialData();

          lernDispatch({ type: "LOAD_LERN_DATA", payload: lernData });
          userDispatch({ type: "LOAD_USER_DATA", payload: userData });
        }else{
          console.log('lernData est déja initialisé');
        }
      }

      initialiseDatabase()

    } catch (err) {
      console.error("Erreur lors de l'initialisation:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [lernDispatch, userDispatch, authLoading,lernData]); // isAuthenticated, user,



  // Fonction de synchronisation périodique
const syncUserProgression = useCallback(async () => {
  if (isAuthenticated && user) {
    try {
      console.log('Synchronisation progression utilisateur...',user);
      await FirebaseDataService.syncAuthenticatedUserProgressionData(user.uid);
    } catch (error) {
      console.error('Erreur synchronisation progression:', error);
    }
  }
}, [isAuthenticated, user]);

const startInterval = useCallback(() => {
  if (intervalRef.current) return;
  intervalRef.current = setInterval(syncUserProgression,10 * 60 * 1000); 
}, [syncUserProgression]);

const stopInterval = useCallback(() => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
}, []);



  useEffect(() => {
    if (!authLoading) {
      loadData();
    }
  }, [loadData, authLoading]);

  // Effet pour la synchronisation périodique
useEffect(() => {
  if (!authLoading && isAuthenticated && user) {
    startInterval();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        syncUserProgression();
        startInterval();
      } else if (nextAppState.match(/inactive|background/)) {
        stopInterval();
      }
      appState.current = nextAppState;
    });

    return () => {
      stopInterval();
      subscription?.remove();
    };
  } else {
    stopInterval();
  }
}, [authLoading, isAuthenticated, user, startInterval, stopInterval, syncUserProgression]);

  return {
    isLoading: isLoading || authLoading,
    error,
    retry: loadData,
  };
};
