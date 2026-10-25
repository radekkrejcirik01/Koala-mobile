import React, { JSX } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { ThemeSelect } from '@components/profile/ThemeSelect/ThemeSelect.tsx';
import { ThemeScreenStyle } from '@screens/account/ThemeScreen/ThemeScreen.style';

export const ThemeScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        ThemeScreenStyle.container,
        { paddingTop: top, paddingBottom: bottom || 10 }
      ]}
    >
      <ScreenHeader title="Theme" />
      <View style={ThemeScreenStyle.contentView}>
        <ThemeSelect />
      </View>
    </View>
  );
};
