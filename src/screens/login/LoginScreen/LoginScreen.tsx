import React, { JSX, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { LoginScreenStyle } from '@screens/login/LoginScreen/LoginScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { LoginPostInterface } from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';

export const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const passwordRef = useRef<TextInput>(null);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const canLogin = !!username && !!password;

  const onChangeUsername = useCallback((value: string) => {
    setUsername(value);
    setError(undefined);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
    setError(undefined);
  }, []);

  const login = useCallback(() => {
    if (!canLogin || posting) {
      return;
    }

    setPosting(true);

    postRequest<AuthResponseInterface, LoginPostInterface>('login', {
      username: username.trim(),
      password
    }).subscribe((response: AuthResponseInterface) => {
      setPosting(false);

      if (response?.status) {
        trigger(HapticFeedbackTypes.notificationSuccess);
        dispatch(setUserToken(response?.token));

        PersistStorage.setItem(
          PersistStorageKeys.TOKEN,
          response?.token
        ).catch();

        PreloadService.loadUserObject();
      } else {
        trigger(HapticFeedbackTypes.notificationError);
        setError('Incorrect username or password');
      }
    });
  }, [canLogin, dispatch, password, posting, username]);

  const onPressForgotPassword = useCallback(() => {
    navigateTo(LoginStackNavigatorEnum.ForgotPasswordScreen);
  }, [navigateTo]);

  const onPressSignUp = useCallback(() => {
    navigateTo(LoginStackNavigatorEnum.SecondScreen);
  }, [navigateTo]);

  return (
    <AuthLayout
      headerTitle="Login"
      footer={
        <>
          <Button
            title="Log in"
            disabled={!canLogin}
            posting={posting}
            onPress={login}
            style={LoginScreenStyle.button}
          />
          <Text style={LoginScreenStyle.signUpText}>
            New to Koala?{' '}
            <Text
              suppressHighlighting
              onPress={onPressSignUp}
              style={LoginScreenStyle.signUpLink}
            >
              Create an account
            </Text>
          </Text>
        </>
      }
    >
      <AuthInput
        placeholder="Username"
        autoCapitalize="none"
        textContentType="username"
        autoComplete="username"
        returnKeyType="next"
        submitBehavior="submit"
        value={username}
        onChangeText={onChangeUsername}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <AuthInput
        ref={passwordRef}
        password
        placeholder="Password"
        autoCapitalize="none"
        textContentType="password"
        autoComplete="password"
        returnKeyType="go"
        value={password}
        error={error}
        onChangeText={onChangePassword}
        onSubmitEditing={login}
      />
      <TouchableOpacity
        hitSlop={10}
        activeOpacity={0.7}
        onPress={onPressForgotPassword}
        style={LoginScreenStyle.forgotPasswordView}
      >
        <Text style={LoginScreenStyle.forgotPasswordText}>
          Forgot password?
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};
