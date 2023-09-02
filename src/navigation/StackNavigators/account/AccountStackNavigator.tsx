import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { NavigatorScreenOptions } from '@navigation/RootNavigator/RootStackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import FastImage from 'react-native-fast-image';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import COLORS from '@constants/COLORS';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): JSX.Element => (
    <Account.Navigator screenOptions={NavigatorScreenOptions}>
        <Account.Screen
            name={AccountStackNavigatorEnum.HomeScreen}
            component={HomeScreen}
            options={{
                headerTitle: () => (
                    <FastImage
                        source={require('../../../assets/images/koala.png')}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={{
                title: 'Notifications',
                headerTintColor: COLORS.BLACK,
                headerBackTitleVisible: false
            }}
        />
    </Account.Navigator>
);
