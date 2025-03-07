import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { WordTargetAreaProps } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants';

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
    marginVertical: SPACING.lg,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.medium,
    ...SHADOWS.small,
  },
  slot: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    margin: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: RADIUS.medium,
  },
  char: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
  }
});

export default WordTargetArea; 