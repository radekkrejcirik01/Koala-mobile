import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { useBackButtonStyle } from '@components/general/BackButton/BackButton.style';

export const BackButton = (): JSX.Element => {
  const BackButtonStyle = useBackButtonStyle();
  const { theme, isDark } = useTheme();
  const { navigateBack } = useNavigation(RootStackNavigatorEnum.AccountStack);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      hitSlop={15}
      onPress={navigateBack}
      style={BackButtonStyle.container}
    >
      {/* The grey arrow looks muddy on the brown background */}
      <Icon
        name={IconEnum.BACK}
        size={23}
        color={isDark ? theme.colors.text : undefined}
        style={BackButtonStyle.icon}
      />
    </TouchableOpacity>
  );
};
