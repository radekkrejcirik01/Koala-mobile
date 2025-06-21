import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import {
  BottomTabNavigatorOptions,
  HomeTabOptions,
  NotificationsTabbOptions,
  ProfileTabOptions
} from '@navigation/BottomTabNavigator/BottomTabNavigator.options';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { NotificationsScreen } from '@screens/account/NotificationsScreen/NotificationsScreen';

export const BottomTabNavigator = (): JSX.Element => {
  const TabBar = createBottomTabNavigator();

  return (
    <TabBar.Navigator screenOptions={BottomTabNavigatorOptions}>
      <TabBar.Screen
        name={BottomTabNavigatorEnum.HomeTab}
        component={HomeScreen}
        options={HomeTabOptions}
      />
      <TabBar.Screen
        name={BottomTabNavigatorEnum.CheckOnTab}
        component={NotificationsScreen}
        options={NotificationsTabbOptions}
      />
      <TabBar.Screen
        name={BottomTabNavigatorEnum.ProfileTab}
        component={ProfileScreen}
        options={ProfileTabOptions}
      />
    </TabBar.Navigator>
  );
};
