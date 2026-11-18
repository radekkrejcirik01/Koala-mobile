import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { OnboardingStackNavigator } from '@navigation/StackNavigators/onboarding/OnboardingStackNavigator';

const Root = createNativeStackNavigator<ParamListBase>();

export const RootStackNavigator = (): JSX.Element => {
  const { token, emailRequired } = useSelector(
    (state: ReducerProps) => state.user
  );

  // Home only opens once the email, the last step of sign up, is confirmed
  if (token && emailRequired) {
    return (
      <Root.Navigator id="onboarding" screenOptions={NavigatorScreenOptions}>
        <Root.Screen
          name={RootStackNavigatorEnum.OnboardingStack}
          component={OnboardingStackNavigator}
          options={NoHeader}
        />
      </Root.Navigator>
    );
  }
  if (token) {
    return (
      <Root.Navigator id="account" screenOptions={NavigatorScreenOptions}>
        <Root.Screen
          name={RootStackNavigatorEnum.AccountStack}
          component={AccountStackNavigator}
          options={NoHeader}
        />
      </Root.Navigator>
    );
  }
  return (
    <Root.Navigator id={'login'} screenOptions={NavigatorScreenOptions}>
      <Root.Screen
        name={RootStackNavigatorEnum.LoginStack}
        component={LoginStackNavigator}
        options={NoHeader}
      />
    </Root.Navigator>
  );
};
