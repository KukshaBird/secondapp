import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { WordTargetAreaProps } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CONTAINER_WIDTH = SCREEN_WIDTH - (SPACING.md * 4); // Account for container padding and margins

const WordTargetArea: React.FC<WordTargetAreaProps> = ({
  targetSlots,
  onSlotPress
}) => {
  // Calculate adaptive slot size based on number of characters
  const slotSize = useMemo(() => {
    const totalSlots = targetSlots.length;
    // Account for margins between slots (SPACING.xs * 2 per slot)
    const availableWidth = MAX_CONTAINER_WIDTH - (totalSlots * SPACING.xs * 2);
    // Calculate size with a small buffer to ensure fit
    const calculatedSize = Math.floor(availableWidth / totalSlots);
    // Set minimum size to prevent too small slots
    return Math.max(32, Math.min(48, calculatedSize));
  }, [targetSlots.length]);

  // Calculate font size based on slot size
  const fontSize = useMemo(() => {
    return slotSize > 40 ? TYPOGRAPHY.fontSizes.xl : 
           slotSize > 35 ? TYPOGRAPHY.fontSizes.lg : 
           TYPOGRAPHY.fontSizes.md;
  }, [slotSize]);

  return (
    <View style={styles.container}>
      <View style={styles.slotsRow}>
        {targetSlots.map((char, index) => (
          <Pressable 
            key={index} 
            style={[
              styles.slot,
              { 
                width: slotSize, 
                height: slotSize,
                margin: SPACING.xs
              }
            ]}
            onPress={() => onSlotPress(index)}
          >
            {char && <Text style={[styles.char, { fontSize }]}>{char}</Text>}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: RADIUS.medium,
    ...SHADOWS.small,
    alignItems: 'center',
  },
  slotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap', // Prevent wrapping to new line
  },
  slot: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: RADIUS.medium,
  },
  char: {
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
  }
});

export default WordTargetArea; 