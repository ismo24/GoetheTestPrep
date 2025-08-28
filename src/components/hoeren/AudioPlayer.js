import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useImperativeHandle,
    forwardRef,
  } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import { Audio } from "expo-av";
  import { colors } from "../../styles/colors";
  
  const AudioPlayer = forwardRef(({
    audio_url,
    onAudioFinished,
    autoPlay = false,
    countdown = 5,
  }, ref) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [countdownTime, setCountdownTime] = useState(countdown);
    const [showCountdown, setShowCountdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const countdownInterval = useRef(null);
    const isMounted = useRef(true);
  
    // ✅ Exposer les méthodes pour le parent via useImperativeHandle
    useImperativeHandle(ref, () => ({
      stopAudio: async () => {
        await stopAudio();
      },
      pauseAudio: async () => {
        await pauseAudio();
      },
      isCurrentlyPlaying: () => isPlaying,
    }), [isPlaying]);
  
    // ✅ Fonction pour arrêter complètement l'audio
    const stopAudio = useCallback(async () => {
      if (sound && isMounted.current) {
        try {
          await sound.stopAsync();
          setIsPlaying(false);
          setCurrentTime(0);
        } catch (error) {
          console.error("Erreur lors de l'arrêt:", error);
        }
      }
      
      // Arrêter le compte à rebours aussi
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
        countdownInterval.current = null;
        setShowCountdown(false);
      }
    }, [sound]);
  
    // Nettoyer les ressources
    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
        if (sound) {
          sound.unloadAsync().catch(console.error);
        }
        if (countdownInterval.current) {
          clearInterval(countdownInterval.current);
          countdownInterval.current = null;
        }
      };
    }, [sound]);
  
    // Charger l'audio quand le composant est monté
    useEffect(() => {
      if (audio_url) {
        loadAudio();
      }
    }, [audio_url]);
  
    // Optimisation du callback pour éviter les re-créations
    const onPlaybackStatusUpdate = useCallback(
      (status) => {
        if (!isMounted.current) return;
  
        if (status.isLoaded) {
          setCurrentTime(Math.floor(status.positionMillis / 1000));
          if (status.durationMillis) {
            setDuration(Math.floor(status.durationMillis / 1000));
          }
  
          if (status.didJustFinish) {
            setIsPlaying(false);
            if (onAudioFinished) onAudioFinished();
          }
        } else if (status.error) {
          console.error("Erreur de lecture:", status.error);
          setIsPlaying(false);
          setIsLoading(false);
        }
      },
      [onAudioFinished]
    );
  
    // Compte à rebours avant lecture automatique
    useEffect(() => {
      // Nettoyer l'interval existant
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
        countdownInterval.current = null;
      }
  
      // Démarrer le compte à rebours quand autoPlay=true et audio chargé
      if (autoPlay && isLoaded && isMounted.current) {
        setShowCountdown(true);
        setCountdownTime(countdown);
  
        countdownInterval.current = setInterval(() => {
          if (!isMounted.current) {
            if (countdownInterval.current) {
              clearInterval(countdownInterval.current);
              countdownInterval.current = null;
            }
            return;
          }
  
          setCountdownTime((prev) => {
            if (prev <= 1) {
              setShowCountdown(false);
              playAudio();
              if (countdownInterval.current) {
                clearInterval(countdownInterval.current);
                countdownInterval.current = null;
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
  
      return () => {
        if (countdownInterval.current) {
          clearInterval(countdownInterval.current);
          countdownInterval.current = null;
        }
      };
    }, [autoPlay, isLoaded, countdown]);
  
    const loadAudio = async () => {
      if (!isMounted.current) return;
  
      try {
        setIsLoading(true);
  
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
  
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audio_url },
          {
            shouldPlay: false,
            isLooping: false,
            volume: 1.0,
          },
          onPlaybackStatusUpdate
        );
  
        if (isMounted.current) {
          setSound(newSound);
          setIsLoaded(true);
          setIsLoading(false);
        } else {
          // Si le composant a été démonté, nettoyer l'audio
          newSound.unloadAsync().catch(console.error);
        }
      } catch (error) {
        console.error("Erreur lors du chargement audio:", error);
        if (isMounted.current) {
          setIsLoading(false);
          Alert.alert("Erreur Audio", "Impossible de charger le fichier audio");
        }
      }
    };
  
    const playAudio = useCallback(async () => {
      if (sound && isLoaded && isMounted.current) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && isMounted.current) {
            await sound.playAsync();
            setIsPlaying(true);
          }
        } catch (error) {
          console.error("Erreur lors de la lecture:", error);
          if (isMounted.current) {
            Alert.alert("Erreur", "Impossible de lire le fichier audio");
          }
        }
      }
    }, [sound, isLoaded]);
  
    const pauseAudio = useCallback(async () => {
      if (sound && isMounted.current) {
        try {
          await sound.pauseAsync();
          setIsPlaying(false);
        } catch (error) {
          console.error("Erreur lors de la pause:", error);
        }
      }
    }, [sound]);
  
    const togglePlayPause = useCallback(() => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    }, [isPlaying, playAudio, pauseAudio]);
  
    const restartAudio = useCallback(async () => {
      if (sound && isMounted.current) {
        try {
          await sound.setPositionAsync(0);
          setCurrentTime(0);
          if (isPlaying) {
            await sound.playAsync();
          }
        } catch (error) {
          console.error("Erreur lors du redémarrage:", error);
        }
      }
    }, [sound, isPlaying]);
  
    const formatTime = useCallback((seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }, []);
  
    if (showCountdown) {
      return (
        <View style={styles.countdownContainer}>
          <View style={styles.countdownCircle}>
            <Text style={styles.countdownText}>{countdownTime}</Text>
          </View>
          <Text style={styles.countdownLabel}>
            Audio startet automatisch in...
          </Text>
        </View>
      );
    }
  
    return (
      <View style={styles.audioContainer}>
        <View style={styles.playerContainer}>
          <TouchableOpacity
            style={[
              styles.playButton,
              { opacity: isLoading || !isLoaded ? 0.5 : 1 },
            ]}
            onPress={togglePlayPause}
            disabled={isLoading || !isLoaded}
          >
            {isLoading ? (
              <Ionicons name="hourglass" size={24} color={colors.white} />
            ) : (
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
  
          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          </View>
  
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width:
                      duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                  },
                ]}
              />
            </View>
          </View>
  
          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
  
          <TouchableOpacity
            onPress={restartAudio}
            disabled={!isLoaded}
            style={styles.restartButton}
          >
            <Ionicons
              name="refresh"
              size={20}
              color={isLoaded ? colors.gray : colors.lightGray}
            />
          </TouchableOpacity>
        </View>
  
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {isLoading
              ? "Chargement..."
              : !isLoaded
              ? "Erreur de chargement"
              : isPlaying
              ? "En lecture"
              : "Prêt"}
          </Text>
        </View>
      </View>
    );
  });
  
  const styles = StyleSheet.create({
    countdownContainer: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 40,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    countdownCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    countdownText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.white,
    },
    countdownLabel: {
      fontSize: 16,
      color: colors.gray,
      textAlign: "center",
    },
    audioContainer: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    playerContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.lightGray,
      borderRadius: 25,
      padding: 8,
      gap: 12,
    },
    playButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    timeDisplay: {
      minWidth: 40,
    },
    timeText: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    progressContainer: {
      flex: 1,
      marginHorizontal: 8,
    },
    progressBar: {
      height: 4,
      backgroundColor: "#E5E5EA",
      borderRadius: 2,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    restartButton: {
      padding: 4,
    },
    statusContainer: {
      marginTop: 8,
      alignItems: "center",
    },
    statusText: {
      fontSize: 12,
      color: colors.gray,
    },
  });
  
  export default AudioPlayer;