import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, Button } from 'react-native';
import { transformWord } from '../utils/textTransformations';
import DraggableCharacter from './DraggableCharacter';
import WordTargetArea from './WordTargetArea';
import { WordGameProps, GameStatus } from '../types';

const WordGame: React.FC<WordGameProps> = ({
  word,
  imagePath = 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  onSuccess
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
  }, [originalWord]);

  // Handle selecting a character from scrambled area
  const handleCharacterSelect = (index: number) => {
    if (selectedIndices.includes(index) || nextAvailableSlot >= originalWord.length) {
      return;
    }
    
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
    if (targetArrangement[index] === null) {
      return;
    }
    
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
      Alert.alert('Success!', 'You arranged the word correctly!', [
        { text: 'Next', onPress: () => onSuccess && onSuccess() }
      ]);
    } else {
      setGameStatus('failed');
      Alert.alert('Try Again', 'The arrangement is not correct. Try again!', [
        { text: 'OK', onPress: resetGame }
      ]);
    }
  };

  // Reset the game
  const resetGame = () => {
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
  };

  return (
    <View style={styles.container}>
      {/* Display the image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagePath }} style={styles.image} />
      </View>
      
      {/* Display the target area where characters will be arranged */}
      <Text style={styles.instruction}>Arrange the letters to form the correct word:</Text>
      <WordTargetArea 
        targetSlots={targetArrangement} 
        onSlotPress={handleSlotPress}
      />
      
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
      <Button title="Reset" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  scrambledContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default WordGame; 