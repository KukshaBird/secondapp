import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { WordGame, DifficultySelector } from '../components';
import type { Difficulty } from '../components';
import { WORD_IMAGE_PAIRS } from '../constants';

const HomeScreen = (): React.JSX.Element => {
  // Current word-image pair index
  const [currentPairIndex, setCurrentPairIndex] = useState<number>(0);
  const currentPair = WORD_IMAGE_PAIRS[currentPairIndex];
  
  // Difficulty level
  const [difficulty, setDifficulty] = useState<Difficulty>('hard');
  
  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty): void => {
    setDifficulty(newDifficulty);
  };
  
  // Handle successful completion of a word
  const handleSuccess = (): void => {
    // Move to the next word-image pair or cycle back to the first one
    const nextIndex = (currentPairIndex + 1) % WORD_IMAGE_PAIRS.length;
    setCurrentPairIndex(nextIndex);
    
    // If we've completed all pairs, show a congratulations message
    if (nextIndex === 0) {
      Alert.alert(
        'Congratulations!',
        'You have completed all the words! Let\'s start again.',
        [{ text: 'OK' }]
      );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Word Arrangement Game</Text>
      <Text style={styles.subtitle}>Arrange the letters to form the correct word</Text>
      
      <DifficultySelector 
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      
      <WordGame 
        word={currentPair.word}
        imagePath={currentPair.image}
        onSuccess={handleSuccess}
        difficulty={difficulty}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  }
});

export default HomeScreen; 