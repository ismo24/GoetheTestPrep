import { useState, useCallback, useEffect } from 'react';
import { useLernData, useUserData } from '../context/AppDataContext';
import { DataService } from '../services/DataService';

export const useAppInitialization = () => {
  const { lernDispatch } = useLernData();
  const { userDispatch } = useUserData();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { lernData, userData } = await DataService.loadInitialData();

      lernDispatch({ type: 'LOAD_LERN_DATA', payload: lernData });
      userDispatch({ type: 'LOAD_USER_DATA', payload: userData });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [lernDispatch, userDispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { isLoading, error, retry: loadData };
};