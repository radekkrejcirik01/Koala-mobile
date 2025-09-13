import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const BackButton = (): JSX.Element => {
  const { navigateBack } = useNavigation(RootStackNavigatorEnum.AccountStack);

  return (
    <TouchableOpacity activeOpacity={0.7} hitSlop={15} onPress={navigateBack}>
      <Icon name={IconEnum.BACK} size={20} />
    </TouchableOpacity>
  );
};
