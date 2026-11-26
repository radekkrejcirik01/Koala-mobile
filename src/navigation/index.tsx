import React, { JSX } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { useTheme } from '@hooks/useTheme.ts';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import {
  getCurrentRouteName,
  navigationRef
} from '@utils/getCurrentRouteName.ts';
import { AnalyticsService } from '@utils/general/AnalyticsService';

export const Navigation = (): JSX.Element => {
  const theme = useTheme();

  const BASE = theme.isDark ? DarkTheme : DefaultTheme;
  const THEME = {
    ...BASE,
    colors: {
      ...BASE.colors,
      background: theme.theme.colors.background,
      card: theme.theme.colors.background,
      text: theme.theme.colors.text
    }
  };

  const logScreen = () => AnalyticsService.logScreen(getCurrentRouteName());

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={THEME}
      onReady={logScreen}
      onStateChange={logScreen}
    >
      <RootStackNavigator />
    </NavigationContainer>
  );
};
