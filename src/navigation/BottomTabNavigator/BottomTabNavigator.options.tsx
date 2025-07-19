import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
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
        { fontSize: focused ? 26 : 24, opacity: focused ? 1 : 0.8 }
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
    <FastImage
      source={require('../../assets/images/koala.png')}
      style={[
        BottomTabNavigatorStyle.tabBarIconImage,
        {
          height: focused ? 32 : 30,
          width: focused ? 32 : 30,
          opacity: focused ? 1 : 0.8
        }
      ]}
    />
  )
};
