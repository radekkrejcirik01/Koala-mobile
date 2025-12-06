import React from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { useTheme } from '@contexts/ThemeContext';

export const Navigation = (): JSX.Element => {
  const theme = useTheme();
  const navigationRef = createNavigationContainerRef();

  const THEME = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.theme.colors.background
    }
  };

  return (
    <NavigationContainer ref={navigationRef} theme={THEME}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
