import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelSelectionView from '../components/hoeren/LevelSelectionView';
import ExerciseListView from '../components/hoeren/ExerciseListView';
import ExerciseView from '../components/hoeren/ExerciseView';
import ResultsView from '../components/hoeren/ResultsView';
import { Fahigkeiten } from '../data/constantsProvisories/Constants';
import { colors } from '../styles/colors';

const HoerenScreen = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [exerciseResults, setExerciseResults] = useState(null);

  const levels = [
    {
      id: 'A1',
      title: 'Anfänger',
      subtitle: 'Grundlegendes Hörverstehen',
      color: colors.success,
      icon: 'leaf',
      image: require('../../assets/images/start.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'A2',
      title: 'Grundlegend',
      subtitle: 'Einfache Audios verstehen',
      color: colors.secondary,
      icon: 'flower',
      image: require('../../assets/images/basics.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'B1',
      title: 'Mittelstufe',
      subtitle: 'Alltägliche Gespräche verstehen',
      color: colors.warning,
      icon: 'star',
      image: require('../../assets/images/engrenage.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'B2',
      title: 'Fortgeschritten',
      subtitle: 'Komplexe Audios verstehen',
      color: colors.primary,
      icon: 'trophy',
      image: require('../../assets/images/rocket.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'C1',
      title: 'Kompetent',
      subtitle: 'Anspruchsvolle Audios verstehen',
      color: '#E91E63',
      icon: 'diamond',
      image: require('../../assets/images/diploma.png'), 
      imageSize: { width: 90, height: 90 },
      imageOffset: { x: 20, y: 20 }
    },
    {
      id: 'C2',
      title: 'Meister',
      subtitle: 'Muttersprachliches Hörverstehen',
      color: '#9C27B0',
      icon: 'crown',
      image: require('../../assets/images/trophy.png'), 
      imageSize: { width: 100, height: 100 },
      imageOffset: { x: 20, y: 20 }
    }
  ];

  // Calculer les résultats de l'exercice
  const calculateExerciseResults = () => {
    if (!selectedExercise || !selectedExercise.data || !selectedExercise.data.questions) return null;

    let totalQuestions = selectedExercise.data.questions.length;
    let correctAnswers = 0;
    const detailedResults = [];

    selectedExercise.data.questions.forEach((question, questionIndex) => {
      const selectedOptionId = selectedAnswers[questionIndex];
      
      if (selectedOptionId) {
        const selectedOption = question.options?.find(opt => opt.id === selectedOptionId);
        const isCorrect = selectedOption?.isCorrect || false;
        
        if (isCorrect) correctAnswers++;
        
        detailedResults.push({
          questionIndex: questionIndex + 1,
          questionText: question.title,
          selectedAnswer: selectedOption?.text || '',
          correctAnswer: question.options?.find(opt => opt.isCorrect)?.text || '',
          isCorrect,
          explanation: question.explanation
        });
      }
    });

    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      percentage,
      detailedResults: [{
        audioIndex: 1,
        questions: detailedResults
      }]
    };
  };

  // Terminer l'exercice
  const finishExercise = () => {
    const results = calculateExerciseResults();
    setExerciseResults(results);
    setShowResults(true);
    
    // Mettre à jour le statut de l'exercice
    if (selectedExercise && results) {
      const levelData = Fahigkeiten.hoeren[selectedLevel];
      const exerciseIndex = levelData.findIndex(ex => ex.id === selectedExercise.id);
      if (exerciseIndex !== -1) {
        levelData[exerciseIndex].well_Answered = results.percentage >= 70; // 70% = réussi
        levelData[exerciseIndex].lastResult = results.percentage;
      }
    }
  };

  // Recommencer l'exercice
  const restartExercise = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setExerciseResults(null);
  };

  // Réinitialiser quand on change d'exercice
  React.useEffect(() => {
    if (selectedExercise) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      setExerciseResults(null);
    }
  }, [selectedExercise]);

  // Obtenir les exercices pour un niveau donné
  const getExercisesForLevel = (levelId) => {
    const levelData = Fahigkeiten.hoeren[levelId];
    if (!Array.isArray(levelData)) return [];
    
    return levelData.map((exercise, index) => ({
      id: exercise.id,
      title: `Übung ${index + 1}`,
      questionsCount: exercise.questions?.length || 0,
      totalQuestions: exercise.questions?.length || 0,
      data: exercise,
      completed: exercise.well_Answered,
      lastResult: exercise.lastResult || 0,
      audioUrl: exercise.audioUrl // Pour les exercices d'écoute
    }));
  };

  // Sélectionner une réponse
  const selectAnswer = (questionIndex, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionId
    }));
  };

  // Rendu conditionnel des vues
  if (selectedExercise && showResults && exerciseResults) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ResultsView
          selectedUbung={selectedExercise}
          exerciseResults={exerciseResults}
          levelInfo={levels.find(l => l.id === selectedLevel)}
          onBack={() => setSelectedExercise(null)}
          onRestart={restartExercise}
        />
      </SafeAreaView>
    );
  }

  if (selectedExercise) {
    // Adapter l'exercice pour le composant ExerciseView
    const adaptedExercise = {
      ...selectedExercise,
      data: [{
        audioUrl: selectedExercise.data.audioUrl,
        questions: selectedExercise.data.questions
      }]
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ExerciseView
          selectedUbung={adaptedExercise}
          currentAudioIndex={0} // Toujours 0 car un seul audio par exercice
          selectedAnswers={selectedAnswers}
          levelInfo={levels.find(l => l.id === selectedLevel)}
          onBack={() => setSelectedExercise(null)}
          onNextAudio={() => {}} // Pas de navigation entre audios
          onPreviousAudio={() => {}} // Pas de navigation entre audios
          onSelectAnswer={(questionIndex, optionId) => selectAnswer(questionIndex, optionId)}
          onFinishExercise={finishExercise}
        />
      </SafeAreaView>
    );
  }

  if (selectedLevel) {
    const exercises = getExercisesForLevel(selectedLevel);
    const levelInfo = levels.find(l => l.id === selectedLevel);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ExerciseListView
          selectedLevel={selectedLevel}
          ubungen={exercises}
          levelInfo={levelInfo}
          onBack={() => setSelectedLevel(null)}
          onSelectUbung={setSelectedExercise}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <LevelSelectionView
        levels={levels}
        onBack={() => navigation.goBack()}
        onSelectLevel={setSelectedLevel}
        getUbungenForLevel={getExercisesForLevel}
      />
    </SafeAreaView>
  );
};

export default HoerenScreen;