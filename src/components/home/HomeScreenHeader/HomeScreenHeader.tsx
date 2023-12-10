import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { NotificationsHeader } from '@components/home/NotificationsHeader/NotificationsHeader';
import { ReducerProps } from '@store/index/index.props';
import { HomeScreenHeaderStyle } from '@components/home/HomeScreenHeader/HomeScreenHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const HomeScreenHeader = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={HomeScreenHeaderStyle.container}>
            <View style={HomeScreenHeaderStyle.row}>
                <Text style={HomeScreenHeaderStyle.emojiText}>🌱</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={20}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.ProfileScreen)
                    }
                >
                    <Text style={HomeScreenHeaderStyle.homeTitleText}>
                        {name}
                    </Text>
                </TouchableOpacity>
            </View>
            <NotificationsHeader />
        </View>
    );
};
