/**
 * App theme and styling constants
 */

export const COLORS = {
  // Primary colors
  primary: '#6C63FF',
  primaryDark: '#5A52D9',
  primaryLight: '#B4B0FF',
  
  // Secondary colors
  secondary: '#FF6584',
  secondaryDark: '#E54D6B',
  secondaryLight: '#FF9DB2',
  
  // Neutrals
  background: '#F8F9FE',
  cardBackground: '#FFFFFF',
  darkText: '#2D3748',
  lightText: '#718096',
  
  // UI Elements
  border: '#E2E8F0',
  divider: '#EDF2F7',
  
  // Feedback colors
  success: '#48BB78',
  error: '#F56565',
  warning: '#ED8936',
  info: '#4299E1',
  
  // Others
  shadow: 'rgba(113, 128, 150, 0.2)',
};

export const TYPOGRAPHY = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  round: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
}; 