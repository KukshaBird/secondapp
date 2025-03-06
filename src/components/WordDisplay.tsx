import React from 'react';
import { Text, StyleSheet } from 'react-native';

type WordDisplayProps = {
  word?: string; // Optional with default value
};

const WordDisplay = ({ word = "hello" }: WordDisplayProps) => {
  return (
    <Text style={styles.text}>{word}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default WordDisplay; 