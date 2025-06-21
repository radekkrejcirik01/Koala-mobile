import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
  tabBarStyle: {
    borderTopWidth: 0
  },
  tabBarActiveTintColor: COLORS.PURPLE,
  tabBarInactiveTintColor: COLORS.LIGHTGRAY_100,
  headerShown: false,
  tabBarShowLabel: false
};

export const HomeTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => (
    <Text style={BottomTabNavigatorStyle.tabBarIconEmoji}>🏠</Text>
  )
};

export const CheckOnTabbOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => (
    <Text style={BottomTabNavigatorStyle.tabBarIconEmoji}>🙋</Text>
  )
};

export const ProfileTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => (
    <FastImage
      source={require('../../assets/images/koala.png')}
      style={BottomTabNavigatorStyle.tabBarIconImage}
    />
  )
};
