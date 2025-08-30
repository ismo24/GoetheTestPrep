import React, { useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerInvisible = forwardRef(({ 
  audioUrl, 
  onAudioFinished,
  autoPlay = false 
}, ref) => {
  const soundRef = useRef(null);
  const isMountedRef = useRef(true);

  // Exposer les méthodes pour le parent
  useImperativeHandle(ref, () => ({
    playAudio: async () => {
      await playAudio();
    },
    stopAudio: async () => {
      await stopAudio();
    },
    isPlaying: async () => {
      if (soundRef.current) {
        try {
          const status = await soundRef.current.getStatusAsync();
          return status.isLoaded && status.isPlaying;
        } catch (error) {
          return false;
        }
      }
      return false;
    }
  }), []);

  // Callback pour les mises à jour de statut
  const onPlaybackStatusUpdate = useCallback((status) => {
    if (!isMountedRef.current) return;

    if (status.isLoaded) {
      if (status.didJustFinish) {
        
        if (onAudioFinished) onAudioFinished();
      }
    } else if (status.error) {
      console.error('Erreur audio:', status.error);
    }
  }, [onAudioFinished]);

  // Fonction pour jouer l'audio
  const playAudio = useCallback(async () => {
    if (!audioUrl || !isMountedRef.current) {
      console.log("Pas d'URL audio ou composant démonté");
      return;
    }

    try {
      // Nettoyer l'audio précédent
      await stopAudio();

     

      // Configuration audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // Créer et jouer le son
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { 
          shouldPlay: true, 
          isLooping: false,
          volume: 1.0,
        },
        onPlaybackStatusUpdate
      );

      if (isMountedRef.current) {
        soundRef.current = sound;
      } else {
        // Si démonté pendant le chargement, nettoyer immédiatement
        sound.unloadAsync().catch(console.error);
      }

    } catch (error) {
      console.error('Erreur lors de la lecture audio:', error);
    }
  }, [audioUrl, onPlaybackStatusUpdate]);

  // Fonction pour arrêter l'audio
  const stopAudio = useCallback(async () => {
    if (soundRef.current) {
      try {
        const currentSound = soundRef.current;
        soundRef.current = null;
        
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }
        
        
      } catch (error) {
        if (!error.message?.includes('Seeking interrupted')) {
          console.error('Erreur lors de l\'arrêt audio:', error);
        }
      }
    }
  }, []);

  // Auto-play si demandé
  useEffect(() => {
    if (autoPlay && audioUrl) {
      playAudio();
    }
  }, [autoPlay, audioUrl, playAudio]);

  // Nettoyage à la destruction du composant
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {
          // Ignorer les erreurs lors du démontage
        });
      }
    };
  }, []);

  // Ce composant ne rend rien
  return null;
});

export default AudioPlayerInvisible;