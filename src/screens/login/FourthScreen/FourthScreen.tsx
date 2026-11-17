import React, { JSX, useCallback, useState } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { postRequest } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { UserPostInterface } from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { ReducerProps } from '@store/index/index.props';
import { FourthScreenStyle } from '@screens/login/FourthScreen/FourthScreen.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';
import { PasswordStrength } from '@components/login/PasswordStrength/PasswordStrength';
import { PASSWORD_MAX_LENGTH } from '@constants/AUTH';

export const FourthScreen = (): JSX.Element => {
  const { name, username } = useSelector(
    (state: ReducerProps) => state.newAccount
  );
  const dispatch = useDispatch();

  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
    setError(undefined);
  }, []);

  const createAccount = useCallback(() => {
    if (!password || posting) {
      return;
    }

    setPosting(true);

    postRequest<AuthResponseInterface, UserPostInterface>('user', {
      name,
      username,
      password
    }).subscribe((response: AuthResponseInterface) => {
      setPosting(false);

      if (!response?.status) {
        setError('Something went wrong. Please try again.');
        return;
      }

      if (response?.message?.includes('exists')) {
        trigger(HapticFeedbackTypes.notificationError);
        setError('This username was just taken. Go back and choose another.');
        return;
      }

      trigger(HapticFeedbackTypes.notificationSuccess);
      dispatch(setUserToken(response?.token));

      PersistStorage.setItem(PersistStorageKeys.TOKEN, response?.token).catch();

      PreloadService.loadUserObject();
    });
  }, [dispatch, name, password, posting, username]);

  const openPrivacyPolicy = useCallback(() => {
    navigateTo(LoginStackNavigatorEnum.PrivacyPolicyScreen);
  }, [navigateTo]);

  return (
    <AuthLayout
      title="Create a password"
      step={3}
      totalSteps={4}
      footer={
        <>
          <Text style={FourthScreenStyle.privacyPolicyText}>
            By creating an account you agree to our{' '}
            <Text
              suppressHighlighting
              onPress={openPrivacyPolicy}
              style={FourthScreenStyle.privacyPolicyLink}
            >
              Privacy Policy
            </Text>
          </Text>
          <Button
            title="Create account"
            disabled={!password}
            posting={posting}
            onPress={createAccount}
            style={FourthScreenStyle.button}
          />
        </>
      }
    >
      <AuthInput
        autoFocus
        password
        placeholder="Password"
        autoCapitalize="none"
        textContentType="newPassword"
        autoComplete="password-new"
        returnKeyType="done"
        maxLength={PASSWORD_MAX_LENGTH}
        value={password}
        error={error}
        onChangeText={onChangePassword}
        onSubmitEditing={createAccount}
      />
      <PasswordStrength password={password} />
    </AuthLayout>
  );
};
