import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigatorScreenOptions,
  NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { EmailScreen } from '@screens/account/EmailScreen/EmailScreen';
import { VerifyEmailScreen } from '@screens/account/VerifyEmailScreen/VerifyEmailScreen';

const Onboarding = createNativeStackNavigator<ParamListBase>();

// The required email step after sign up, shown instead of the account stack
// until the email is confirmed
export const OnboardingStackNavigator = (): React.JSX.Element => (
  <Onboarding.Navigator
    id="onboardingStack"
    initialRouteName={AccountStackNavigatorEnum.EmailScreen}
    screenOptions={NavigatorScreenOptions}
  >
    <Onboarding.Screen
      name={AccountStackNavigatorEnum.EmailScreen}
      component={EmailScreen as unknown as React.ComponentType}
      initialParams={{ onboarding: true }}
      options={NoHeader}
    />
    <Onboarding.Screen
      name={AccountStackNavigatorEnum.VerifyEmailScreen}
      component={VerifyEmailScreen as unknown as React.ComponentType}
      options={NoHeader}
    />
  </Onboarding.Navigator>
);
