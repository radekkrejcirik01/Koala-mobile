import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    borderTopWidth: 0
  },
  headerShown: false,
  tabBarShowLabel: false
};

export const HomeTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Text
      style={[
        BottomTabNavigatorStyle.tabBarIconEmoji,
        { fontSize: focused ? 26 : 24 }
      ]}
    >
      🏠
    </Text>
  )
};

export const NotificationsTabbOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => <NotificationsButton focused={focused} />
};

export const ProfileTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Text
      style={[
        BottomTabNavigatorStyle.tabBarIconEmoji,
        { fontSize: focused ? 26 : 24 }
      ]}
    >
      🙍‍♂️
    </Text>
  )
};
