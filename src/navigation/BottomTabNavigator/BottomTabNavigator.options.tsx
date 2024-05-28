import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    tabBarStyle: {
        borderTopWidth: 0
    },
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel,
    headerShown: false
};

export const HomeTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (
        <Text style={BottomTabNavigatorStyle.tabBarIconEmoji}>🏠</Text>
    )
};

export const CheckOnTabbOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Check-on',
    tabBarIcon: () => (
        <Text style={BottomTabNavigatorStyle.tabBarIconEmoji}>🙋</Text>
    )
};

export const ProfileTabOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: () => (
        <FastImage
            source={require('../../assets/images/koala.png')}
            style={BottomTabNavigatorStyle.tabBarIconImage}
        />
    )
};
