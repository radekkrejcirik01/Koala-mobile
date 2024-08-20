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
import { ChatScreen } from '@screens/account/ChatScreen/ChatScreen';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { AccountScreen } from '@screens/account/AccountScreen/AccountScreen';
import { SharingHistoryScreen } from '@screens/account/SharingHistoryScreen/SharingHistoryScreen';
import { SharedScreen } from '@screens/account/SharedScreen/SharedScreen';
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { AnxietyAndPanicScreen } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen';
import { DepressionScreen } from '@screens/account/DepressionScreen/DepressionScreen';
import { WellbeingScreen } from '@screens/account/WellbeingScreen/WellbeingScreen';
import { KudosScreen } from '@screens/account/KudosScreen/KudosScreen';
import { FeedbackScreen } from '@screens/account/FeedbackScreen/FeedbackScreen';
import { SupportScreen } from '@screens/account/SupportScreen/SupportScreen';

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
            name={AccountStackNavigatorEnum.AnxietyAndPanicScreen}
            component={AnxietyAndPanicScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.DepressionScreen}
            component={DepressionScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.FeedbackScreen}
            component={FeedbackScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.HomeScreen}
            component={HomeScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.KudosScreen}
            component={KudosScreen}
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
            name={AccountStackNavigatorEnum.ChangePasswordScreen}
            component={ChangePasswordScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.ChatScreen}
            component={ChatScreen}
            options={NoHeader}
        />
        <Account.Screen
            name={AccountStackNavigatorEnum.WellbeingScreen}
            component={WellbeingScreen}
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
        <Account.Screen
            name={AccountStackNavigatorEnum.SupportScreen}
            component={SupportScreen}
            options={NoHeader}
        />
    </Account.Navigator>
);
