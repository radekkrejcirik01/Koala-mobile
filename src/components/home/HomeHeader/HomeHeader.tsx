import React, { JSX, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { useAppState } from '@hooks/useAppState';
import { ReducerProps } from '@store/index/index.props';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';
import { getGreeting } from '@functions/getGreeting';

export const HomeHeader = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [greeting, setGreeting] = useState<string>();

    useAppState(() => {
        setGreeting(getGreeting);
    });

    useEffect(() => {
        setGreeting(getGreeting);
    }, []);

    return (
        <View style={HomeHeaderStyle.container}>
            <View>
                <Text style={HomeHeaderStyle.greetingText}>{greeting},</Text>
                <Text style={HomeHeaderStyle.nameText}>{name}</Text>
            </View>
            <NotificationsButton
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
                }
            />
        </View>
    );
};
