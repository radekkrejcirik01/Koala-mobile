import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigator } from '@navigation/StackNavigators/login/LoginStackNavigator';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { AccountStackNavigator } from '@navigation/StackNavigators/account/AccountStackNavigator';
import { BottomTabNavigator } from '@navigation/BottomTabNavigator/BottomTabNavigator';

const Root = createStackNavigator<ParamListBase>();
export const RootStackNavigator = (): JSX.Element => {
    const { token } = useSelector((state: ReducerProps) => state.user);

    if (token) {
        return (
            <Root.Navigator screenOptions={NavigatorScreenOptions}>
                <Root.Screen
                    name={RootStackNavigatorEnum.BottomTabBar}
                    component={BottomTabNavigator}
                    options={NoHeader}
                />
                <Root.Screen
                    name={RootStackNavigatorEnum.AccountStack}
                    component={AccountStackNavigator}
                    options={NoHeader}
                />
            </Root.Navigator>
        );
    }
    return (
        <Root.Navigator>
            <Root.Screen
                name={RootStackNavigatorEnum.LoginStack}
                component={LoginStackNavigator}
                options={NoHeader}
            />
        </Root.Navigator>
    );
};
