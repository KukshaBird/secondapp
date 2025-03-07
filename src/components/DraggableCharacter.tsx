import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { DraggableCharacterProps } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants';

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
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: COLORS.primary,
    margin: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.medium,
    ...SHADOWS.small,
  },
  selectedBox: {
    backgroundColor: COLORS.divider,
    borderColor: COLORS.lightText,
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  char: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.darkText,
  },
  selectedChar: {
    color: COLORS.lightText,
  }
});

export default DraggableCharacter; 