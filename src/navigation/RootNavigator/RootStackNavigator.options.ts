import { StackNavigationOptions } from '@react-navigation/stack';
import { transitionConfig } from './RootStackNavigator.config';

export const NavigatorScreenOptions: StackNavigationOptions = {
    transitionSpec: {
        open: transitionConfig,
        close: transitionConfig
    },
    headerTitleAlign: 'center'
};

export const NoHeader: StackNavigationOptions = {
    headerShown: false
};
