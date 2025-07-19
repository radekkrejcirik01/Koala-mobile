export interface Theme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    error: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    error: '#B00020'
  }
};

export const darkTheme: Theme = {
  colors: {
    primary: '#bb86fc',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    error: '#cf6679'
  }
};
