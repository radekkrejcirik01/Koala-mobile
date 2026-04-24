import React, { JSX } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@hooks/useTheme.ts';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { navigationRef } from '@utils/getCurrentRouteName.ts';

export const Navigation = (): JSX.Element => {
  const theme = useTheme();

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
