import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const HomeHeader = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const { name, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const navigateToChats = () => {
    navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
  };

  return (
    <View style={HomeHeaderStyle.container}>
      <ProfilePhoto name={name} photo={profilePhoto} size={42} />
      <Text style={HomeHeaderStyle.title}>Start a new chat</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={navigateToChats}>
        <NotificationsButton />
      </TouchableOpacity>
    </View>
  );
};
