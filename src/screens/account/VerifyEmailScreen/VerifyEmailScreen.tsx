import React, { JSX, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { useResendCountdown } from '@hooks/useResendCountdown';
import { putRequest } from '@utils/Axios/Axios.service';
import { getAuthErrorMessage } from '@utils/general/getAuthErrorMessage';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import {
  EmailPostInterface,
  EmailVerifyPostInterface
} from '@interfaces/post/Post.interface';
import { setEmailAction } from '@store/UserReducer';
import { CODE_LENGTH } from '@constants/AUTH';
import { VerifyEmailScreenProps } from '@screens/account/VerifyEmailScreen/VerifyEmailScreen.props';
import { VerifyEmailScreenStyle } from '@screens/account/VerifyEmailScreen/VerifyEmailScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';
import { ResendCode } from '@components/login/ResendCode/ResendCode';

export const VerifyEmailScreen = ({
  route
}: VerifyEmailScreenProps): JSX.Element => {
  const { email, onboarding } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // EmailScreen just sent the first code
  const { remaining, start } = useResendCountdown(true);

  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const verify = useCallback(
    (value: string) => {
      if (value.length !== CODE_LENGTH || posting) {
        return;
      }

      setPosting(true);

      putRequest<ResponseInterface, EmailVerifyPostInterface>(
        'user-email/verify',
        { code: value },
        { errorBody: true }
      ).subscribe((response: ResponseInterface) => {
        setPosting(false);

        if (response?.status !== 'success') {
          trigger(HapticFeedbackTypes.notificationError);
          setError(getAuthErrorMessage(response));
          return;
        }

        trigger(HapticFeedbackTypes.notificationSuccess);
        dispatch(setEmailAction(email));
        Toast.show({ type: 'success', text1: 'Email confirmed' });

        // Back past EmailScreen to wherever it was opened from
        navigation.dispatch(StackActions.pop(2));
      });
    },
    [dispatch, email, navigation, posting]
  );

  const onChangeCode = useCallback((value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH));
    setError(undefined);
  }, []);

  const resend = useCallback(() => {
    start();
    setCode('');
    setError(undefined);

    putRequest<ResponseInterface, EmailPostInterface>(
      'user-email',
      { email },
      { errorBody: true }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status !== 'success') {
        setError(getAuthErrorMessage(response));
        return;
      }

      Toast.show({ type: 'success', text1: 'New code sent' });
    });
  }, [email, start]);

  return (
    <AuthLayout
      title="Enter the code"
      subtitle={`We sent a ${CODE_LENGTH}-digit code to ${email}. It's valid for 15 minutes.`}
      step={onboarding ? 4 : undefined}
      totalSteps={onboarding ? 4 : undefined}
      footer={
        <Button
          title="Confirm"
          disabled={code.length !== CODE_LENGTH}
          posting={posting}
          onPress={() => verify(code)}
          style={VerifyEmailScreenStyle.button}
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
        error={error}
        onChangeText={onChangeCode}
      />
      <ResendCode remaining={remaining} onPress={resend} />
    </AuthLayout>
  );
};
