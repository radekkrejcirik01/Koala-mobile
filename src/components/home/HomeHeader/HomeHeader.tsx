import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';
import { ReducerProps } from '@store/index/index.props';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const HomeHeader = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={HomeHeaderStyle.container}>
            <View style={HomeHeaderStyle.row}>
                <Text style={HomeHeaderStyle.emojiText}>🌱</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={20}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.ProfileScreen)
                    }
                >
                    <Text style={HomeHeaderStyle.homeTitleText}>{name}</Text>
                </TouchableOpacity>
            </View>
            <NotificationsButton
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
                }
            />
        </View>
    );
};
