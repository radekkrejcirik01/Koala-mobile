import { StackNavigationOptions } from '@react-navigation/stack';
import COLORS from '@constants/COLORS';

export const PrivacyPolicyOptions: StackNavigationOptions = {
  title: 'Privacy policy',
  headerBackTitleVisible: false,
  headerTintColor: COLORS.BLACK
};

export const ForgotPasswordOptions: StackNavigationOptions = {
  title: 'Forgot password',
  headerBackTitleVisible: false,
  headerTintColor: COLORS.BLACK
};
