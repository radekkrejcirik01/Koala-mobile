import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { ChangePasswordScreen } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen';
import { FeedbackScreen } from '@screens/account/FeedbackScreen/FeedbackScreen';
import { SupportScreen } from '@screens/account/SupportScreen/SupportScreen';
import { EditNameScreen } from '@screens/account/EditNameScreen/EditNameScreen';
import { ShareStackNavigator } from '@navigation/StackNavigators/share/ShareStackNavigator';

const Account = createNativeStackNavigator<ParamListBase>();

export const AccountStackNavigator = (): React.JSX.Element => (
  <Account.Navigator
    id="accountStack"
    initialRouteName={AccountStackNavigatorEnum.HomeScreen}
    screenOptions={NavigatorScreenOptions}
  >
    <Account.Screen
      name={AccountStackNavigatorEnum.AccountScreen}
      component={AccountScreen}
      options={NoHeader}
    />
    <Account.Screen
      name={AccountStackNavigatorEnum.EditNameScreen}
      component={EditNameScreen}
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
      name={AccountStackNavigatorEnum.ShareScreen}
      component={ShareStackNavigator}
      options={{
        ...NoHeader,
        presentation: 'modal'
      }}
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
      component={ChatScreen as unknown as React.ComponentType}
      options={NoHeader}
    />
    <Account.Screen
      name={AccountStackNavigatorEnum.SupportScreen}
      component={SupportScreen}
      options={NoHeader}
    />
  </Account.Navigator>
);
