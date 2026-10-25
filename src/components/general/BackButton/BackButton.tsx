import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { BackButtonStyle } from '@components/general/BackButton/BackButton.style';

export const BackButton = (): JSX.Element => {
  const { navigateBack } = useNavigation(RootStackNavigatorEnum.AccountStack);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      hitSlop={15}
      onPress={navigateBack}
      style={BackButtonStyle.container}
    >
      <Icon name={IconEnum.BACK} size={23} style={BackButtonStyle.icon} />
    </TouchableOpacity>
  );
};
