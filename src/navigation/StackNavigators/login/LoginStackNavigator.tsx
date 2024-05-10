import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
    NavigatorScreenOptions,
    NoHeader
} from '@navigation/RootNavigator/RootStackNavigator.options';
import { FirstScreen } from '@screens/login/FirstScreen/FirstScreen';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { SecondScreen } from '@screens/login/SecondScreen/SecondScreen';
import { ThirdScreen } from '@screens/login/ThirdScreen/ThirdScreen';
import { FourthScreen } from '@screens/login/FourthScreen/FourthScreen';
import { PrivacyPolicyScreen } from '@screens/login/PrivacyPolicyScreen/PrivacyPolicyScreen';
import {
    ForgotPasswordOptions,
    PrivacyPolicyOptions
} from '@navigation/StackNavigators/login/LoginStackNavigator.options';
import { LoginScreen } from '@screens/login/LoginScreen/LoginScreen';
import { ForgotPasswordScreen } from '@screens/login/ForgotPasswordScreen/ForgotPasswordScreen';
import { FirstIntroductionScreen } from '@screens/login/FirstIntroductionScreen/FirstIntroductionScreen';
import { SecondIntroductionScreen } from '@screens/login/SecondIntroductionScreen/SecondIntroductionScreen';

const Login = createStackNavigator<ParamListBase>();

export const LoginStackNavigator = (): JSX.Element => (
    <Login.Navigator screenOptions={NavigatorScreenOptions}>
        <Login.Screen
            name={LoginStackNavigatorEnum.FirstScreen}
            component={FirstScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.FirstIntroductionScreen}
            component={FirstIntroductionScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.SecondIntroductionScreen}
            component={SecondIntroductionScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.SecondScreen}
            component={SecondScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.ThirdScreen}
            component={ThirdScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.FourthScreen}
            component={FourthScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.LoginScreen}
            component={LoginScreen}
            options={NoHeader}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.PrivacyPolicyScreen}
            component={PrivacyPolicyScreen}
            options={PrivacyPolicyOptions}
        />
        <Login.Screen
            name={LoginStackNavigatorEnum.ForgotPasswordScreen}
            component={ForgotPasswordScreen}
            options={ForgotPasswordOptions}
        />
    </Login.Navigator>
);
