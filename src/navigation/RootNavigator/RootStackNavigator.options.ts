import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const NavigatorScreenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  gestureEnabled: true
};

export const NoHeader: NativeStackNavigationOptions = {
  headerShown: false
};
