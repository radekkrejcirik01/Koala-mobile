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
import { RespondScreen } from '@screens/account/RespondScreen/RespondScreen';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { SharingHistoryScreen } from '@screens/account/SharingHistoryScreen/SharingHistoryScreen';
import { SharedScreen } from '@screens/account/SharedScreen/SharedScreen';

const Account = createStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): React.JSX.Element => (
    <Account.Navigator
        initialRouteName={AccountStackNavigatorEnum.HomeScreen}
        screenOptions={NavigatorScreenOptions}
    >
        <Account.Screen
            name={AccountStackNavigatorEnum.AccountScreen}
            component={AccountScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HomeScreen}
            component={HomeScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.NotificationsScreen}
            component={NotificationsScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ProfileScreen}
            component={ProfileScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.RespondScreen}
            component={RespondScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.SharedScreen}
            component={SharedScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.SharingHistoryScreen}
            component={SharingHistoryScreen}
            options={NoHeader}
        />
    </Account.Navigator>
);
