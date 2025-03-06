import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CharacterBoxesProps = {
  text?: string; // Optional with default value "hello"
};

const CharacterBoxes = ({ text = "hello" }: CharacterBoxesProps) => {
  // Ensure text is limited to 16 characters
  const limitedText = text.substring(0, 16);
  
  return (
    <View style={styles.container}>
      {limitedText.split('').map((char, index) => (
        <View key={index} style={styles.box}>
          <Text style={styles.char}>{char}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  char: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CharacterBoxes; 