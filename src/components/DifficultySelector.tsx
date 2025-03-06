import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type Difficulty = 'easy' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Difficulty:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty === 'easy' && styles.activeButton
          ]}
          onPress={() => onDifficultyChange('easy')}
        >
          <Text style={[
            styles.buttonText,
            difficulty === 'easy' && styles.activeButtonText
          ]}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty === 'hard' && styles.activeButton
          ]}
          onPress={() => onDifficultyChange('hard')}
        >
          <Text style={[
            styles.buttonText,
            difficulty === 'hard' && styles.activeButtonText
          ]}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#555',
    fontWeight: '500',
  },
  activeButtonText: {
    color: 'white',
    fontWeight: '600',
  }
});

export default DifficultySelector; 