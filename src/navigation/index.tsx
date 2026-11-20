import React, { JSX } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@hooks/useTheme.ts';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import {
  getCurrentRouteName,
  navigationRef
} from '@utils/getCurrentRouteName.ts';
import { AnalyticsService } from '@utils/general/AnalyticsService';

export const Navigation = (): JSX.Element => {
  const theme = useTheme();

  const THEME = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.theme.colors.background
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
