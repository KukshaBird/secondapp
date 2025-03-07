import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

const WordGame: React.FC<ExtendedWordGameProps> = ({
  word,
  imagePath = 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  onSuccess,
  difficulty = 'hard'
}) => {
  // Original word
  const originalWord = word.toLowerCase();
  
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

  // Initialize the game
  useEffect(() => {
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

  useEffect(() => {
    return () => {
      // Cleanup sounds when component unmounts
      releaseSounds();
    };
  }, []);

  // Handle selecting a character from scrambled area
  const handleCharacterSelect = (index: number) => {
    if (selectedIndices.includes(index) || nextAvailableSlot >= originalWord.length || showWinEffect || showErrorEffect) {
      return;
    }
    
    playSoundEffect.pop(); // Play pop sound when selecting a character
    
    // Mark this character as selected
    setSelectedIndices([...selectedIndices, index]);
    
    // Add the character to the next available slot
    const newTargetArrangement = [...targetArrangement];
    newTargetArrangement[nextAvailableSlot] = scrambledChars[index];
    setTargetArrangement(newTargetArrangement);
    
    // Update next available slot
    setNextAvailableSlot(nextAvailableSlot + 1);
    
    // Check if all slots are filled
    if (nextAvailableSlot === originalWord.length - 1) {
      // All slots filled, check if the arrangement is correct
      setTimeout(() => {
        checkResult([...newTargetArrangement]);
      }, 300);
    }
  };

  // Handle pressing a target slot
  const handleSlotPress = (index: number) => {
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
      setSelectedIndices(selectedIndices.filter(idx => idx !== originalIndex));
      
      // Remove the character from the target arrangement
      const newTargetArrangement = [...targetArrangement];
      
      // Shift all characters after the removed one
      for (let i = index; i < newTargetArrangement.length - 1; i++) {
        newTargetArrangement[i] = newTargetArrangement[i + 1];
      }
      
      // Set the last slot to null
      newTargetArrangement[newTargetArrangement.length - 1] = null;
      
      setTargetArrangement(newTargetArrangement);
      
      // Update next available slot
      setNextAvailableSlot(Math.max(0, nextAvailableSlot - 1));
    }
  };

  // Check if the arranged word matches the original
  const checkResult = (arrangement: Array<string | null>) => {
    const arrangedWord = arrangement.join('');
    
    if (arrangedWord === originalWord) {
      setGameStatus('success');
      playSoundEffect.complete(); // Play completion sound on success
      
      // Show win effect
      setShowWinEffect(true);
      
      // Move to next word after animation ends
    } else {
      setGameStatus('failed');
      playSoundEffect.error(); // Play error sound on failure
      
      // Show error effect (shake)
      setShowErrorEffect(true);
      
      // Game will be reset after shake animation ends
    }
  };

  // Reset the game
  const resetGame = () => {
    playSoundEffect.pop(); // Play pop sound on reset
    
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
  };

  // Handle when error effect completes
  const handleErrorEffectComplete = () => {
    setShowErrorEffect(false);
    // No need to show alert, just reset the game
    resetGame();
  };

  // Handle when win effect completes
  const handleWinEffectComplete = () => {
    setShowWinEffect(false);
    // Move to next word without showing alert
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <View style={styles.container}>
      {/* Content container */}
      <View style={styles.contentContainer}>
        {/* Display the image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagePath }} style={styles.image} />
          
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
        
        <ShakeView shake={showErrorEffect} onComplete={handleErrorEffectComplete}>
          <WordTargetArea 
            targetSlots={targetArrangement} 
            onSlotPress={handleSlotPress}
          />
        </ShakeView>
        
        {/* Display the scrambled characters */}
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
        
        {/* Reset button */}
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={resetGame}
          disabled={showWinEffect || showErrorEffect}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.large,
    padding: SPACING.lg,
    margin: SPACING.md,
    marginBottom: SPACING.xxl,
    alignItems: 'center',
    ...SHADOWS.medium,
    // Ensure container has relative positioning for absolute children
    position: 'relative',
    overflow: 'visible',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 1, // Lower z-index than effects
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.medium,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  instruction: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.darkText,
  },
  statusContainer: {
    minHeight: 50,
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  scrambledContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  wordHintContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: SPACING.sm,
  },
  wordHint: {
    color: 'white',
    textAlign: 'center',
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  resetButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.round,
    ...SHADOWS.small,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    fontSize: TYPOGRAPHY.fontSizes.md,
  }
});

export default WordGame; 