import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { COLORS } from '../constants';
import { playSound } from '../utils/soundUtils';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Types of effects
export type EffectType = 'win' | 'error';

// Balloon colors for win effect
const BALLOON_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.success,
  COLORS.info,
  COLORS.primaryLight,
  COLORS.secondaryLight,
];

interface EffectsProps {
  type: EffectType;
  duration?: number;
  onComplete?: () => void;
}

const Effects: React.FC<EffectsProps> = ({
  type,
  duration = 2000,
  onComplete,
}) => {
  // Track if the effect is active
  const [active, setActive] = useState(true);
  
  // Create array of balloon animations for win effect
  const [balloons] = useState(() => 
    Array.from({ length: 20 }, () => ({
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      scale: new Animated.Value(0),
      rotation: new Animated.Value(0),
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      // Random starting positions across the width of the screen
      startX: Math.random() * SCREEN_WIDTH - SCREEN_WIDTH / 2,
    }))
  );

  // Play sound based on effect type
  useEffect(() => {
    if (active) {
      // Play the corresponding sound
      playSound(type as 'win' | 'error');
    }
  }, [type, active]);

  // Run animations based on effect type
  useEffect(() => {
    if (!active) return;

    if (type === 'win') {
      // Run balloon animations
      const animations = balloons.map((balloon, index) => {
        // Calculate random values for this balloon
        const destinationY = -SCREEN_HEIGHT - 100 - Math.random() * 100;
        const duration = 3000 + Math.random() * 2000;
        const delay = index * 50;

        // Create animation sequence for this balloon
        return Animated.sequence([
          // Initial delay
          Animated.delay(delay),
          // Start the animations together
          Animated.parallel([
            // Move balloon up
            Animated.timing(balloon.position.y, {
              toValue: destinationY,
              duration: duration,
              useNativeDriver: true,
              easing: Easing.out(Easing.cubic),
            }),
            // Small horizontal movement
            Animated.timing(balloon.position.x, {
              toValue: balloon.startX + (Math.random() * 100 - 50),
              duration: duration,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.cubic),
            }),
            // Scale balloon up
            Animated.timing(balloon.scale, {
              toValue: 0.5 + Math.random() * 0.5,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.out(Easing.back(1.5)),
            }),
            // Rotate balloon gently
            Animated.loop(
              Animated.timing(balloon.rotation, {
                toValue: 1,
                duration: 2000 + Math.random() * 1000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.cubic),
              })
            ),
          ]),
        ]);
      });

      // Run all balloon animations
      Animated.parallel(animations).start();
    } else if (type === 'error') {
      // For error effect, we just need simple shake animation
      // This would be implemented in the parent component since it affects the character boxes
      // For now we'll just log it
      console.log('Error effect - would shake characters');
    }

    // Set timeout to end the effect
    const timer = setTimeout(() => {
      setActive(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [balloons, type, duration, onComplete, active]);

  // Don't render anything if not active
  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {type === 'win' && balloons.map((balloon, index) => (
        <Animated.View
          key={index}
          style={[
            styles.balloon,
            {
              backgroundColor: balloon.color,
              transform: [
                { translateX: balloon.position.x },
                { translateY: balloon.position.y },
                { scale: balloon.scale },
                {
                  rotate: balloon.rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-10deg', '10deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    elevation: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  balloon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    bottom: -30,
    zIndex: 9999,
  },
});

export default Effects; 