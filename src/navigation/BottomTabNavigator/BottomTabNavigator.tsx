import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import {
    BottomTabNavigatorOptions,
    CheckOnTabbOptions,
    HomeTabOptions,
    ProfileTabOptions
} from '@navigation/BottomTabNavigator/BottomTabNavigator.options';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';
import { ProfileScreen } from '@screens/account/ProfileScreen/ProfileScreen';
import { CheckOnScreen } from '@screens/account/CheckOnScreen/CheckOnScreen';

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
                component={CheckOnScreen}
                options={CheckOnTabbOptions}
            />
            <TabBar.Screen
                name={BottomTabNavigatorEnum.ProfileTab}
                component={ProfileScreen}
                options={ProfileTabOptions}
            />
        </TabBar.Navigator>
    );
};
