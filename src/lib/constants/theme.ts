export const COLORS = {
  WOOD: {
    DARK: '#2b1810', // Deep mahogany
    MEDIUM: '#5e3023', // Rich walnut
    LIGHT: '#8b4513', // Warm oak
  },
  LEATHER: {
    DARK: '#2c1810', // Dark leather
    MEDIUM: '#703624', // Aged leather
    LIGHT: '#a65d37', // Cognac leather
  },
  BOOK: {
    BROWN1: '#3c2a21', // Deep brown
    BROWN2: '#513b2c', // Rich brown
    BROWN3: '#7d5a50', // Medium brown
    RED: '#8b3a3a', // Subdued red
    GREEN: '#4a5d4b', // Forest green
    BLUE: '#394756', // Navy blue
    BURGUNDY: '#6b4449', // Deep burgundy
  },
  PARCHMENT: '#f5e6d3', // Warm cream
  SHADOW: 'rgba(0, 0, 0, 0.3)',
} as const;

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1920,
  XLARGE: 2560,
} as const;

export const TRANSITIONS = {
  DEFAULT: '0.3s ease',
  SLOW: '1s ease',
  DOOR_OPEN: '1s ease',
} as const;

export const Z_INDEX = {
  DOOR_LEFT: 9997,
  DOOR_RIGHT: 9998,
  DOOR_CENTER: 9999,
  MODAL: 10000,
} as const; 