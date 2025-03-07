import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

interface ShakeViewProps {
  shake: boolean;
  intensity?: number;
  duration?: number;
  onComplete?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ShakeView: React.FC<ShakeViewProps> = ({
  shake,
  intensity = 10,
  duration = 500,
  onComplete,
  style,
  children,
}) => {
  // Animation value for the shake
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Effect to start and control the shake animation
  useEffect(() => {
    if (shake) {
      // Reset to initial position
      shakeAnim.setValue(0);
      
      // Create the shake animation
      Animated.sequence([
        // Sequence of small rapid movements
        Animated.timing(shakeAnim, {
          toValue: intensity,
          duration: duration / 6,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -intensity,
          duration: duration / 6,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: intensity * 0.7,
          duration: duration / 6,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -intensity * 0.7,
          duration: duration / 6,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: intensity * 0.4,
          duration: duration / 6,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: duration / 6,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Call the onComplete callback when animation finishes
        if (onComplete) {
          onComplete();
        }
      });
    }
  }, [shake, intensity, duration, shakeAnim, onComplete]);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ translateX: shakeAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Base component is just a container with no additional styles
  },
});

export default ShakeView; 