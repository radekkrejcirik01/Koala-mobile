import { StackNavigationOptions } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import { transitionConfig } from './RootStackNavigator.config';

const { width } = Dimensions.get('screen');

export const NavigatorScreenOptions: StackNavigationOptions = {
  transitionSpec: {
    open: transitionConfig,
    close: transitionConfig
  },
  headerTitleAlign: 'center',
  gestureResponseDistance: width
};

export const NoHeader: StackNavigationOptions = {
  headerShown: false
};
