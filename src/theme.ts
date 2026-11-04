import COLORS from '@constants/COLORS';

export interface Theme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    surface_200: string;
    text: string;
    error: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    surface: '#f5f5f5',
    surface_200: COLORS.WHITE_200,
    text: '#000000',
    error: '#B00020'
  }
};

export const beigeTheme: Theme = {
  colors: {
    primary: '#6200ee',
    background: COLORS.BEIGE,
    surface: '#f5f5f5',
    surface_200: COLORS.WHITE_200,
    text: '#000000',
    error: '#B00020'
  }
};

export const greenTheme: Theme = {
  colors: {
    primary: '#6200ee',
    background: COLORS.GREEN,
    surface: '#f5f5f5',
    surface_200: COLORS.WHITE_200,
    text: '#000000',
    error: '#B00020'
  }
};

export const blueTheme: Theme = {
  colors: {
    primary: '#6200ee',
    background: COLORS.BLUE,
    surface: '#f5f5f5',
    surface_200: COLORS.WHITE_200,
    text: '#000000',
    error: '#B00020'
  }
};
