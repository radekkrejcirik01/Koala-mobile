import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorEnum } from '@navigation/BottomTabNavigator/BottomTabNavigator.enum';
import { BottomTabNavigatorOptions } from '@navigation/BottomTabNavigator/BottomTabNavigator.options';
import { HomeScreen } from '@screens/account/HomeScreen/HomeScreen';

export const BottomTabNavigator = (): JSX.Element => {
    const TabBar = createBottomTabNavigator();

    return (
        <TabBar.Navigator screenOptions={BottomTabNavigatorOptions}>
            <TabBar.Screen
                name={BottomTabNavigatorEnum.HomeTab}
                component={HomeScreen}
            />
        </TabBar.Navigator>
    );
};
