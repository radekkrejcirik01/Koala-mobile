import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';
import { NotificationsOptions } from '@navigation/StackNavigators/account/AccountStackNavigator.options';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): JSX.Element => (
    <Account.Navigator screenOptions={NavigatorScreenOptions}>
        <Account.Screen
            name={AccountStackNavigatorEnum.HomeScreen}
            component={HomeScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={NotificationsOptions}
        />
    </Account.Navigator>
);
