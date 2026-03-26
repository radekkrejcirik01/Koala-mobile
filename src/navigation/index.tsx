import React, { useMemo } from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';
import { useTheme } from '@contexts/ThemeContext';
import { Images } from '@enums/images';
import COLORS from '@constants/COLORS';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';

export const Navigation = (): JSX.Element => {
  const theme = useTheme();
  const navigationRef = createNavigationContainerRef();

  const { image } = useSelector((state: ReducerProps) => state.user);

  const backgroundColor = useMemo(() => {
    if (image === Images.ROOM) {
      return COLORS.BEIGE;
    }
    if (image === Images.PARK) {
      return COLORS.GREEN;
    }
    if (image === Images.SEA) {
      return COLORS.BLUE;
    }
    return theme.theme.colors.background;
  }, [image, theme.theme.colors.background]);

  const THEME = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: backgroundColor
    }
  };

  return (
    <NavigationContainer ref={navigationRef} theme={THEME}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};
