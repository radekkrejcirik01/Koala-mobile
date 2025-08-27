import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { useTheme } from '@contexts/ThemeContext';
import COLORS from '@constants/COLORS';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const HomeHeader = (): JSX.Element => {
  const theme = useTheme();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const navigateToChats = () => {
    navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
  };

  return (
    <View style={HomeHeaderStyle.container}>
      <Text style={HomeHeaderStyle.title}>{`You are safe\nnow 🫶`}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={navigateToChats}
        style={[
          HomeHeaderStyle.buttonView,
          {
            backgroundColor: theme.isDark
              ? theme.theme.colors.surface
              : COLORS.WHITE
          }
        ]}
      >
        <NotificationsButton />
      </TouchableOpacity>
    </View>
  );
};
