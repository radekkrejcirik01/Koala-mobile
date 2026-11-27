import COLORS from '@constants/COLORS';

export interface ThemeColors {
  primary: string;
  // Links, checkmarks, selected outlines and the text cursor
  accent: string;
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
  accent: COLORS.BUTTON_BLUE,
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

// One dark beige background for every background choice, the splash screen's
// #966c4a, with lighter warm browns and cream text on top
const DARK_COLORS: ThemeColors = {
  primary: '#bb86fc',
  // White, the blue gets lost on the brown background
  accent: COLORS.WHITE,
  background: '#966c4a',
  surface: '#a47651',
  surface_200: '#ffffff1a',
  surface_300: '#ffffff33',
  card: '#a47651',
  bubble: '#ad7f59',
  quote: '#9d714d',
  text: '#fdf8ef',
  textSecondary: '#f0e4cf',
  textTertiary: '#e6d6ba',
  placeholder: '#d8c6a8',
  border: '#b58b69',
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
