import React, { JSX, useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { useResendCountdown } from '@hooks/useResendCountdown';
import { postRequest } from '@utils/Axios/Axios.service';
import { getAuthErrorMessage } from '@utils/general/getAuthErrorMessage';
import {
  AuthResponseInterface,
  ResponseInterface
} from '@interfaces/response/Response.interface';
import {
  PasswordResetConfirmPostInterface,
  PasswordResetRequestPostInterface
} from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { CODE_LENGTH, PASSWORD_MAX_LENGTH } from '@constants/AUTH';
import { ResetPasswordScreenProps } from '@screens/login/ResetPasswordScreen/ResetPasswordScreen.props';
import { ResetPasswordScreenStyle } from '@screens/login/ResetPasswordScreen/ResetPasswordScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';
import { PasswordStrength } from '@components/login/PasswordStrength/PasswordStrength';
import { ResendCode } from '@components/login/ResendCode/ResendCode';

export const ResetPasswordScreen = ({
  route
}: ResetPasswordScreenProps): JSX.Element => {
  const { username, message } = route.params;

  const dispatch = useDispatch();

  const passwordRef = useRef<TextInput>(null);

  // ForgotPasswordScreen just requested the first code
  const { remaining, start } = useResendCountdown(true);

  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [codeError, setCodeError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const canReset = code.length === CODE_LENGTH && !!password;

  const onChangeCode = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setCode(digits);
    setCodeError(undefined);

    if (digits.length === CODE_LENGTH) {
      passwordRef.current?.focus();
    }
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
    setPasswordError(undefined);
  }, []);

  const resetPassword = useCallback(() => {
    if (!canReset || posting) {
      return;
    }

    setPosting(true);

    postRequest<AuthResponseInterface, PasswordResetConfirmPostInterface>(
      'password-reset/confirm',
      { username, code, newPassword: password },
      { errorBody: true }
    ).subscribe((response: AuthResponseInterface) => {
      setPosting(false);

      if (response?.status !== 'success') {
        trigger(HapticFeedbackTypes.notificationError);
        if (response?.message === 'new password is empty') {
          setPasswordError(getAuthErrorMessage(response));
        } else {
          setCodeError(getAuthErrorMessage(response));
        }
        return;
      }

      // The reset logged out every other device, this token is the only one left
      trigger(HapticFeedbackTypes.notificationSuccess);
      dispatch(setUserToken(response.token));

      PersistStorage.setItem(PersistStorageKeys.TOKEN, response.token).catch();

      PreloadService.loadUserObject();
    });
  }, [canReset, code, dispatch, password, posting, username]);

  const resend = useCallback(() => {
    start();
    setCode('');
    setCodeError(undefined);

    postRequest<ResponseInterface, PasswordResetRequestPostInterface>(
      'password-reset/request',
      { username }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status !== 'success') {
        setCodeError('Something went wrong. Please try again.');
        return;
      }

      Toast.show({ type: 'success', text1: 'New code requested' });
    });
  }, [start, username]);

  return (
    <AuthLayout
      title="Reset password"
      subtitle={`${message}. Enter it below with your new password`}
      footer={
        <Button
          title="Reset password"
          disabled={!canReset}
          posting={posting}
          onPress={resetPassword}
          style={ResetPasswordScreenStyle.button}
        />
      }
    >
      <AuthInput
        autoFocus
        placeholder="Code"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={CODE_LENGTH}
        value={code}
        error={codeError}
        onChangeText={onChangeCode}
      />
      <ResendCode remaining={remaining} onPress={resend} />
      <AuthInput
        ref={passwordRef}
        password
        placeholder="New password"
        autoCapitalize="none"
        textContentType="newPassword"
        autoComplete="password-new"
        returnKeyType="go"
        maxLength={PASSWORD_MAX_LENGTH}
        value={password}
        error={passwordError}
        onChangeText={onChangePassword}
        onSubmitEditing={resetPassword}
      />
      <PasswordStrength password={password} />
    </AuthLayout>
  );
};
