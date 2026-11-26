import COLORS from '@constants/COLORS';

export interface ThemeColors {
  primary: string;
  background: string;
  // Buttons and cards that sit flat on the background
  surface: string;
  // Translucent fills, e.g. icon circles and segmented controls
  surface_200: string;
  // Stronger fills and hairline separators
  surface_300: string;
  // Raised elements, white in light mode: menus, popups, home buttons
  card: string;
  // Incoming message bubbles and the chat input
  bubble: string;
  // The quoted message above a reply, quieter than a bubble
  quote: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  placeholder: string;
  border: string;
  error: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}

const LIGHT_COLORS: ThemeColors = {
  primary: '#6200ee',
  background: COLORS.WHITE,
  surface: '#f5f5f5',
  surface_200: COLORS.WHITE_200,
  surface_300: COLORS.WHITE_300,
  card: COLORS.WHITE,
  bubble: COLORS.BEIGE_200,
  quote: COLORS.BEIGE_200,
  text: COLORS.BLACK,
  textSecondary: COLORS.GRAY_200,
  textTertiary: COLORS.LIGHTGRAY_200,
  placeholder: COLORS.LIGHTGRAY_100,
  border: COLORS.LIGHTGRAY,
  error: '#B00020'
};

// One dark background for every background choice, the splash screen's
// #1c1c1e, with lighter neutral greys on top
const DARK_COLORS: ThemeColors = {
  primary: '#bb86fc',
  background: '#1c1c1e',
  surface: '#2c2c2e',
  surface_200: '#ffffff1a',
  surface_300: '#ffffff33',
  card: '#2c2c2e',
  bubble: '#3a3a3c',
  quote: '#242426',
  text: '#f2f2f5',
  textSecondary: '#a1a1a6',
  textTertiary: '#98989f',
  placeholder: '#8e8e93',
  border: '#48484a',
  error: '#cf6679'
};

const light = (background: string): Theme => ({
  dark: false,
  colors: { ...LIGHT_COLORS, background }
});

export const lightTheme = light(COLORS.WHITE);
export const beigeTheme = light(COLORS.BEIGE);
export const greenTheme = light(COLORS.GREEN);
export const blueTheme = light(COLORS.BLUE);

export const darkTheme: Theme = { dark: true, colors: DARK_COLORS };
