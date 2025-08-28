import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Modal, View, StyleSheet, StatusBar, Platform } from 'react-native';
import ExerciseView from './ExerciseView';
import ResultsView from './ResultsView';
import { colors } from '../../styles/colors';
import { Audio } from 'expo-av';

const ExerciseModal = ({
  visible,
  showResults,
  selectedExercise,
  selectedAnswers,
  exerciseResults,
  levelInfo,
  availableExercises,
  onClose,
  onSelectAnswer,
  onFinishExercise,
  onRestart,
  onNextExercise,
  userNativeLanguage = "FR" 
}) => {
  const [isStartAudioPlaying, setIsStartAudioPlaying] = useState(false);
  const [startAudioFinished, setStartAudioFinished] = useState(false);
  const startAudioRef = useRef(null);
  const isMounted = useRef(true);
  const hasInitialized = useRef(false);
  
  // ✅ NOUVEAU : Tracker le dernier exercice pour détecter les changements
  const lastExerciseId = useRef(null);
  
  // ✅ NOUVEAU : Flag pour indiquer qu'un restart a été demandé
  const pendingRestart = useRef(false);

  // Adapter l'exercice pour ExerciseView - memoizé pour éviter les re-créations
  const adaptedExercise = useMemo(() => {
    if (!selectedExercise) return null;
    
    return {
      ...selectedExercise,
      data: [{
        audio_url: selectedExercise.data?.audio_url,
        questions: selectedExercise.data?.questions || []
      }]
    };
  }, [selectedExercise]);

  // Memoiser les calculs d'index
  const { currentExerciseIndex, hasNextExercise, currentExerciseNumber, totalExercises } = useMemo(() => {
    if (!availableExercises || !selectedExercise) {
      return {
        currentExerciseIndex: -1,
        hasNextExercise: false,
        currentExerciseNumber: 1,
        totalExercises: 1
      };
    }

    const index = availableExercises.findIndex(ex => ex.id === selectedExercise.id);
    return {
      currentExerciseIndex: index,
      hasNextExercise: index < availableExercises.length - 1,
      currentExerciseNumber: index + 1,
      totalExercises: availableExercises.length
    };
  }, [availableExercises, selectedExercise]);

  // ✅ NOUVEAU : Fonction pour initialiser la séquence audio
  const initializeAudioSequence = useCallback(async () => {
    console.log("🎯 Initialisation de la séquence audio complète");
    
    // Reset des états
    setIsStartAudioPlaying(false);
    setStartAudioFinished(false);
    hasInitialized.current = false;
    
    // Nettoyer l'audio existant
    await cleanupStartAudio();
    
    // Petit délai pour le nettoyage
    setTimeout(() => {
      if (isMounted.current && visible && !showResults) {
        hasInitialized.current = true;
        playStartAudio();
        setStartAudioFinished(true);
        console.log("✅ Séquence audio initialisée avec succès");
      }
    }, 100);
  }, [visible, showResults]);

  // ✅ NOUVEAU : Détecter les changements d'exercice
  useEffect(() => {
    if (selectedExercise?.id && selectedExercise.id !== lastExerciseId.current) {
      console.log(`🔄 Changement d'exercice détecté: ${lastExerciseId.current} → ${selectedExercise.id}`);
      lastExerciseId.current = selectedExercise.id;
      
      // Si on n'est pas en mode résultats, relancer la séquence
      if (!showResults) {
        initializeAudioSequence();
      }
    }
  }, [selectedExercise?.id, showResults, initializeAudioSequence]);

  // ✅ NOUVEAU : Fonction pour arrêter l'audio de démarrage
  const stopStartAudio = useCallback(async () => {
    if (startAudioRef.current) {
      try {
        await startAudioRef.current.stopAsync();
        console.log("🔇 Audio de démarrage arrêté");
      } catch (error) {
        console.error('Erreur lors de l\'arrêt de l\'audio de démarrage:', error);
      }
    }
    setIsStartAudioPlaying(false);
  }, []);

  // ✅ NOUVEAU : Effet pour détecter quand showResults repasse à false après un restart
  useEffect(() => {
    if (pendingRestart.current && !showResults && visible) {
      console.log("🔄 showResults est repassé à false - Lancement de la séquence pour Répéter");
      pendingRestart.current = false;
      
      // Petit délai pour s'assurer que tout est stable
      setTimeout(() => {
        initializeAudioSequence();
      }, 100);
    }
  }, [showResults, visible, initializeAudioSequence]);

  // ✅ CORRIGÉ : Fonction pour relancer complètement la séquence audio (pour Répéter)
  const handleRestartAudioSequence = useCallback(async () => {
    console.log("🔄 Demande de relance complète de la séquence audio (Répéter)");
    
    // 1. Marquer qu'un restart est en attente
    pendingRestart.current = true;
    
    // 2. Arrêter l'audio de démarrage actuel
    await stopStartAudio();
    
    // 3. Appeler le callback de restart original
    if (onRestart) {
      onRestart();
    }
    
    // La suite sera gérée par l'useEffect qui détecte showResults = false
  }, [stopStartAudio, onRestart]);

  // ✅ NOUVEAU : Arrêter l'audio de démarrage quand showResults devient true
  useEffect(() => {
    if (showResults) {
      console.log("📊 Passage en mode résultats - Arrêt de l'audio de démarrage");
      stopStartAudio();
    }
  }, [showResults, stopStartAudio]);

  // ✅ NOUVEAU : Wrappers pour arrêter l'audio de démarrage avant navigation
  const handleClose = useCallback(async () => {
    console.log("❌ Fermeture modal - Arrêt de l'audio de démarrage");
    await stopStartAudio();
    lastExerciseId.current = null; // Reset du tracker
    if (onClose) onClose();
  }, [onClose, stopStartAudio]);

  const handleNextExercise = useCallback(async () => {
    console.log("➡️ Exercice suivant - Arrêt de l'audio de démarrage");
    await stopStartAudio();
    
    // ✅ IMPORTANT : Ne pas réinitialiser lastExerciseId.current ici
    // car on veut détecter le changement d'exercice dans l'useEffect
    
    if (onNextExercise) onNextExercise();
    
    // ✅ NOUVEAU : La séquence audio sera relancée automatiquement 
    // par l'useEffect qui détecte le changement d'exercice
  }, [onNextExercise, stopStartAudio]);

  // ✅ MODIFIÉ : Effet pour gérer l'ouverture/fermeture du modal UNIQUEMENT
  useEffect(() => {
    isMounted.current = true;
    
    // PROTECTION : Initialiser seulement à l'ouverture du modal
    if (visible && !showResults && !hasInitialized.current && !lastExerciseId.current) {
      console.log("🚀 Ouverture initiale du modal");
      lastExerciseId.current = selectedExercise?.id || null;
      initializeAudioSequence();
    }
    
    // Nettoyer quand le modal se ferme
    if (!visible) {
      hasInitialized.current = false;
      lastExerciseId.current = null;
      cleanupStartAudio();
      setStartAudioFinished(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [visible, showResults, selectedExercise?.id, initializeAudioSequence]);

  // Callback pour la mise à jour du statut de lecture
  const onPlaybackStatusUpdate = useCallback((status) => {
    if (!isMounted.current) return;
    
    if (status.isLoaded) {
      if (status.didJustFinish) {
        cleanupStartAudio();
        setIsStartAudioPlaying(false);
      }
    } else if (status.error) {
      console.error('Erreur de lecture:', status.error);
      setIsStartAudioPlaying(false);
    }
  }, []);

  const playStartAudio = useCallback(async () => {
    if (!isMounted.current || hasInitialized.current === false) return;
    
    try {
      setIsStartAudioPlaying(true);
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../../assets/audios/Hoeren_start_zweimal.mp3'),
        { 
          shouldPlay: true, 
          isLooping: false,
          volume: 1.0,
        },
        onPlaybackStatusUpdate
      );

      if (isMounted.current) {
        startAudioRef.current = newSound;
      } else {
        newSound.unloadAsync().catch(console.error);
      }
      
    } catch (error) {
      console.error('Erreur lors de la lecture de l\'audio de démarrage:', error);
      setIsStartAudioPlaying(false);
    }
  }, [onPlaybackStatusUpdate]);

  // Fonction pour nettoyer l'audio
  const cleanupStartAudio = useCallback(async () => {
    if (startAudioRef.current) {
      try {
        await startAudioRef.current.unloadAsync();
        startAudioRef.current = null;
      } catch (error) {
        console.error('Erreur lors du nettoyage de l\'audio:', error);
      }
    }
  }, []);

  // Cleanup à la destruction du composant
  useEffect(() => {
    return () => {
      console.log("🧹 Nettoyage du modal - Arrêt de l'audio de démarrage");
      stopStartAudio();
      cleanupStartAudio();
    };
  }, [cleanupStartAudio, stopStartAudio]);

  // Vérifier si le modal doit être affiché
  if (!visible || !selectedExercise) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={[styles.container, {marginTop: Platform.OS === "ios" ? 30 : 0}]}>
        <View style={styles.content}>
          {adaptedExercise && (
            <ExerciseView
              selectedUbung={adaptedExercise}
              currentAudioIndex={0}
              selectedAnswers={selectedAnswers}
              exerciseResults={exerciseResults}
              levelInfo={levelInfo}
              currentExerciseNumber={currentExerciseNumber}
              totalExercises={totalExercises}
              showResults={showResults}
              hasNextExercise={hasNextExercise}
              onBack={handleClose}
              onNextAudio={() => {}}
              onPreviousAudio={() => {}}
              onSelectAnswer={onSelectAnswer}
              onFinishExercise={onFinishExercise}
              onRestart={onRestart}
              onNextExercise={handleNextExercise}
              onRestartAudioSequence={handleRestartAudioSequence}
              isStartAudioPlaying={isStartAudioPlaying}
              startAudioFinished={startAudioFinished}
              userNativeLanguage={userNativeLanguage}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight || 0, // Pour Android
  },
  content: {
    flex: 1,
  },
});

export default ExerciseModal;