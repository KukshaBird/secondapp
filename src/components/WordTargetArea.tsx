import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { WordTargetAreaProps } from '../types';

const WordTargetArea: React.FC<WordTargetAreaProps> = ({
  targetSlots,
  onSlotPress
}) => {
  return (
    <View style={styles.container}>
      {targetSlots.map((char, index) => (
        <Pressable 
          key={index} 
          style={styles.slot}
          onPress={() => onSlotPress(index)}
        >
          {char && <Text style={styles.char}>{char}</Text>}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  slot: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#666',
    borderStyle: 'dashed',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  char: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default WordTargetArea; 