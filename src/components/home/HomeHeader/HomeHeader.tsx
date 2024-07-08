import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';

export const HomeHeader = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={HomeHeaderStyle.container}>
            <View>
                <Text style={HomeHeaderStyle.title}>🏠 Home</Text>
            </View>
            <NotificationsButton
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
                }
            />
        </View>
    );
};
