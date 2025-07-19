import React from 'react';
import {
  createNavigationContainerRef,
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { useColorScheme } from 'react-native';
import COLORS from '@constants/COLORS';

export const Navigation = (): JSX.Element => {
  const theme = useColorScheme();
  const navigationRef = createNavigationContainerRef();

  const LIGHT_THEME = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.WHITE
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme === 'light' ? LIGHT_THEME : DarkTheme}
    >
      <RootStackNavigator />
    </NavigationContainer>
  );
};
