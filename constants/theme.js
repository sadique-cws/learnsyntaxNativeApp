export const COLORS = {
    // Base colors
    primary: '#008080', // Teal
    primaryDark: '#006666', // Darker Teal
    secondary: '#2DD4BF', // Teal 400

    // Backgrounds
    background: '#FFFFFF', // White
    surface: '#F8FAFC', // Slate 50 (Very light gray)
    surfaceLight: '#F1F5F9', // Slate 100

    // Text
    text: '#0F172A', // Slate 900
    textSecondary: '#64748B', // Slate 500
    textMuted: '#94A3B8', // Slate 400

    // Functional
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',

    // UI Elements
    border: '#E2E8F0', // Slate 200
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
};

export const SIZES = {
    // Global sizes
    base: 8,
    font: 14,
    radius: 0, // Sharp corners
    padding: 24,

    // Font Sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 2,
    },
    medium: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 4,
    },
    dark: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.2,
        shadowRadius: 9.11,
        elevation: 8,
    },
};

const appTheme = { COLORS, SIZES, SHADOWS };

export default appTheme;
