import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { DraggableCharacterProps } from '../types';

const DraggableCharacter: React.FC<DraggableCharacterProps> = ({
  char,
  index,
  onSelect,
  isSelected = false
}) => {
  return (
    <Pressable 
      style={[styles.box, isSelected && styles.selectedBox]}
      onPress={() => onSelect(index)}
    >
      <Text style={[styles.char, isSelected && styles.selectedChar]}>{char}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedBox: {
    backgroundColor: '#e0e0e0',
    borderColor: '#666',
    opacity: 0.5,
  },
  char: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedChar: {
    color: '#888',
  }
});

export default DraggableCharacter; 