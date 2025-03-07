import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
} from 'react-native';
import { WordGame, DifficultySelector } from '../components';
import type { Difficulty } from '../components';
import { WORD_IMAGE_PAIRS } from '../constants';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants';

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
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Word Wizard</Text>
          <Text style={styles.subtitle}>Arrange letters to form words</Text>
        </View>
        
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
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Word {currentPairIndex + 1} of {WORD_IMAGE_PAIRS.length}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.xxxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    textAlign: 'center',
    color: 'white',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressContainer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  progressText: {
    color: COLORS.lightText,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  }
});

export default HomeScreen; 