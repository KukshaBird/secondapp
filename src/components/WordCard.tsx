import React from 'react';
import { View, StyleSheet } from 'react-native';
import CharacterBoxes from './CharacterBoxes';

type WordCardProps = {
  word?: string; // Optional with default value
};

const WordCard = ({ word = "hello" }: WordCardProps) => {
  return (
    <View style={styles.card}>
      <CharacterBoxes text={word} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
});

export default WordCard; 