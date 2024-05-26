import React, { JSX, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { useAppState } from '@hooks/useAppState';
import { ReducerProps } from '@store/index/index.props';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { MessagesButton } from '@components/home/MessagesButton/MessagesButton';
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
                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={20}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.ProfileScreen)
                    }
                >
                    <Text style={HomeHeaderStyle.nameText}>{name}</Text>
                </TouchableOpacity>
            </View>
            <MessagesButton
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
                }
            />
        </View>
    );
};
