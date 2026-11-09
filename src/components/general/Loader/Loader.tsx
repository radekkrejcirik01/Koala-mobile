import React, { JSX } from 'react';
import { ActivityIndicator, View } from 'react-native';
import COLORS from '@constants/COLORS';
import { LoaderStyle } from '@components/general/Loader/Loader.style';

// Full screen loader, render it as the last child of a screen's root view
// so it is always centered on the screen
export const Loader = (): JSX.Element => (
  <View style={LoaderStyle.view} pointerEvents="none">
    <ActivityIndicator color={COLORS.WHITE} />
  </View>
);
