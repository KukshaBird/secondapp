import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS } from '../constants';

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
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.darkText,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginRight: SPACING.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.round,
    padding: SPACING.xs,
  },
  button: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.round,
    marginHorizontal: 2,
  },
  activeButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.small
  },
  buttonText: {
    color: COLORS.lightText,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    fontSize: TYPOGRAPHY.fontSizes.sm,
  },
  activeButtonText: {
    color: 'white',
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  }
});

export default DifficultySelector; 