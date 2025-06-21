import React from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import COLORS from '@constants/COLORS';

export const Navigation = (): JSX.Element => {
  const navigationRef = createNavigationContainerRef();

  const LIGHT_THEME = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.WHITE
    }
  };

  return (
    <NavigationContainer ref={navigationRef} theme={LIGHT_THEME}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
