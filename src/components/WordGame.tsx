import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { transformWord } from '../utils/textTransformations';
import DraggableCharacter from './DraggableCharacter';
import WordTargetArea from './WordTargetArea';
import { WordGameProps, GameStatus } from '../types';
import { Difficulty } from './DifficultySelector';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants';
import Effects from './Effects';
import ShakeView from './ShakeView';
import { playSoundEffect, releaseSounds } from '../utils/soundEffects';

interface ExtendedWordGameProps extends WordGameProps {
  difficulty?: Difficulty;
}

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const WordGame: React.FC<ExtendedWordGameProps> = ({
  word,
  imagePath = 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  onSuccess,
  difficulty = 'hard'
}) => {
  // Original word
  const originalWord = useMemo(() => word.toLowerCase(), [word]);
  
  // State for scrambled characters
  const [scrambledChars, setScrambledChars] = useState<string[]>([]);
  // State to track which characters have been selected (placed in target)
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  // State for the target arrangement
  const [targetArrangement, setTargetArrangement] = useState<Array<string | null>>([]);
  // Track next available target slot
  const [nextAvailableSlot, setNextAvailableSlot] = useState(0);
  // Game status
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  
  // Animation states
  const [showWinEffect, setShowWinEffect] = useState(false);
  const [showErrorEffect, setShowErrorEffect] = useState(false);

  // Initialize the game - memoized to prevent unnecessary re-renders
  const initializeGame = useCallback(() => {
    // Create scrambled characters from the word
    const shuffled = transformWord(originalWord, 'shuffle');
    setScrambledChars(shuffled);
    
    // Reset the target arrangement with empty slots
    setTargetArrangement(Array(originalWord.length).fill(null));
    
    // Reset selected indices
    setSelectedIndices([]);
    
    // Reset next available slot
    setNextAvailableSlot(0);
    
    // Reset game status
    setGameStatus('playing');
    
    // Reset animations
    setShowWinEffect(false);
    setShowErrorEffect(false);
  }, [originalWord]);

  // Initialize on mount and when word changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Cleanup sounds on unmount
  useEffect(() => {
    return () => {
      releaseSounds();
    };
  }, []);

  // Handle selecting a character from scrambled area - memoized to prevent recreating on each render
  const handleCharacterSelect = useCallback((index: number) => {
    if (selectedIndices.includes(index) || nextAvailableSlot >= originalWord.length || showWinEffect || showErrorEffect) {
      return;
    }
    
    playSoundEffect.pop(); // Play pop sound when selecting a character
    
    // Mark this character as selected
    setSelectedIndices(prevIndices => [...prevIndices, index]);
    
    // Add the character to the next available slot
    setTargetArrangement(prevArrangement => {
      const newArrangement = [...prevArrangement];
      newArrangement[nextAvailableSlot] = scrambledChars[index];
      
      // Check if all slots are filled after this update
      if (nextAvailableSlot === originalWord.length - 1) {
        // All slots filled, check if the arrangement is correct
        setTimeout(() => {
          checkResult([...newArrangement]);
        }, 300);
      }
      
      return newArrangement;
    });
    
    // Update next available slot
    setNextAvailableSlot(prevSlot => prevSlot + 1);
  }, [selectedIndices, nextAvailableSlot, originalWord.length, showWinEffect, showErrorEffect, scrambledChars]);

  // Handle pressing a target slot - memoized
  const handleSlotPress = useCallback((index: number) => {
    if (targetArrangement[index] === null || showWinEffect || showErrorEffect) {
      return;
    }
    
    playSoundEffect.pop(); // Play pop sound when removing a character
    
    // Find the original index of this character
    const charToRemove = targetArrangement[index];
    const originalIndex = scrambledChars.findIndex(
      (char, idx) => char === charToRemove && selectedIndices.includes(idx)
    );
    
    if (originalIndex !== -1) {
      // Remove this character from selected indices
      setSelectedIndices(prevIndices => prevIndices.filter(idx => idx !== originalIndex));
      
      // Update target arrangement
      setTargetArrangement(prevArrangement => {
        const newArrangement = [...prevArrangement];
        
        // Shift all characters after the removed one
        for (let i = index; i < newArrangement.length - 1; i++) {
          newArrangement[i] = newArrangement[i + 1];
        }
        
        // Set the last slot to null
        newArrangement[newArrangement.length - 1] = null;
        
        return newArrangement;
      });
      
      // Update next available slot
      setNextAvailableSlot(prevSlot => Math.max(0, prevSlot - 1));
    }
  }, [targetArrangement, showWinEffect, showErrorEffect, scrambledChars, selectedIndices]);

  // Check if the arranged word matches the original - memoized
  const checkResult = useCallback((arrangement: Array<string | null>) => {
    const arrangedWord = arrangement.join('');
    
    if (arrangedWord === originalWord) {
      setGameStatus('success');
      playSoundEffect.complete(); // Play completion sound on success
      
      // Show win effect
      setShowWinEffect(true);
    } else {
      setGameStatus('failed');
      playSoundEffect.error(); // Play error sound on failure
      
      // Show error effect (shake)
      setShowErrorEffect(true);
    }
  }, [originalWord]);

  // Handle next word - memoized
  const handleNextWord = useCallback(() => {
    playSoundEffect.pop(); // Play pop sound when moving to next word
    
    // Always move to the next word regardless of game state
    if (onSuccess) {
      onSuccess(); // This will trigger the parent component to move to the next word
    }
  }, [onSuccess]);

  // Handle when win effect completes - memoized
  const handleWinEffectComplete = useCallback(() => {
    setShowWinEffect(false);
    
    // Automatically move to the next word when animation completes
    if (onSuccess) {
      onSuccess();
    }
  }, [onSuccess]);

  // Handle when error effect completes - memoized
  const handleErrorEffectComplete = useCallback(() => {
    setShowErrorEffect(false);
    // Don't reset automatically
  }, []);

  // Memoize the scrambled characters rendering to prevent unnecessary re-renders
  const scrambledCharactersSection = useMemo(() => (
    <View style={styles.scrambledContainer}>
      {scrambledChars.map((char, index) => (
        <DraggableCharacter
          key={index}
          char={char}
          index={index}
          onSelect={handleCharacterSelect}
          isSelected={selectedIndices.includes(index)}
        />
      ))}
    </View>
  ), [scrambledChars, selectedIndices, handleCharacterSelect]);

  // Memoize the target area to prevent unnecessary re-renders
  const targetAreaSection = useMemo(() => (
    <ShakeView shake={showErrorEffect} onComplete={handleErrorEffectComplete}>
      <WordTargetArea 
        targetSlots={targetArrangement} 
        onSlotPress={handleSlotPress}
      />
    </ShakeView>
  ), [targetArrangement, showErrorEffect, handleErrorEffectComplete, handleSlotPress]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        bounces={false}
      >
        <View style={styles.container}>
          {/* Content container */}
          <View style={styles.contentContainer}>
            {/* Display the image */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: imagePath }} 
                style={styles.image}
                resizeMode="cover"
                resizeMethod="resize"
              />
              
              {/* Show the word hint if difficulty is easy */}
              {difficulty === 'easy' && (
                <View style={styles.wordHintContainer}>
                  <Text style={styles.wordHint}>{originalWord}</Text>
                </View>
              )}
            </View>
            
            {/* Game status indicator */}
            <View style={styles.statusContainer}>
              <Text style={styles.instruction}>
                {gameStatus === 'playing' 
                  ? 'Arrange the letters to form the correct word:' 
                  : gameStatus === 'success' 
                    ? 'Great job! You got it right!' 
                    : 'Not quite right. Try again!'}
              </Text>
            </View>
            
            {targetAreaSection}
            
            {scrambledCharactersSection}
            
            {/* Next button */}
            <TouchableOpacity 
              style={[
                styles.actionButton
              ]} 
              onPress={handleNextWord}
              disabled={showWinEffect || showErrorEffect}
            >
              <Text style={styles.buttonText}>Далі</Text>
            </TouchableOpacity>
          </View>
          
          {/* Win effect - rendered last so it appears on top */}
          {showWinEffect && (
            <Effects
              type="win"
              duration={3000}
              onComplete={handleWinEffectComplete}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.md,
  },
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.large,
    padding: SPACING.md,
    margin: SPACING.sm,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    ...SHADOWS.medium,
    position: 'relative',
    overflow: 'visible',
    minHeight: SCREEN_HEIGHT * 0.65,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  imageContainer: {
    width: '100%',
    height: Math.min(200, SCREEN_HEIGHT * 0.25),
    marginBottom: SPACING.md,
    borderRadius: RADIUS.medium,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  instruction: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    marginBottom: SPACING.xs,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.darkText,
  },
  statusContainer: {
    minHeight: 40,
    justifyContent: 'center',
    marginBottom: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  scrambledContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  wordHintContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: SPACING.xs,
  },
  wordHint: {
    color: 'white',
    textAlign: 'center',
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  actionButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round,
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    fontSize: TYPOGRAPHY.fontSizes.sm,
  }
});

export default WordGame; 