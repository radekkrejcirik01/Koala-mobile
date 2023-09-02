import React from 'react';
import {
    createNavigationContainerRef,
    NavigationContainer
} from '@react-navigation/native';
import { RootStackNavigator } from '@navigation/RootNavigator/RootStackNavigator';

export const Navigation = (): JSX.Element => {
    const navigationRef = createNavigationContainerRef();

    return (
        <NavigationContainer ref={navigationRef}>
            <RootStackNavigator />
        </NavigationContainer>
    );
};
