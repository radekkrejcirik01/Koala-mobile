import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorStyle } from '@navigation/BottomTabNavigator/BottomTabNavigator.style';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorOptions: BottomTabNavigationOptions = {
    headerTintColor: COLORS.WHITE,
    headerStyle: BottomTabNavigatorStyle.header,
    tabBarStyle: BottomTabNavigatorStyle.tabBar,
    tabBarLabelStyle: BottomTabNavigatorStyle.tabBarLabel,
    title: null,
    tabBarShowLabel: false,
    tabBarIcon: null
};
