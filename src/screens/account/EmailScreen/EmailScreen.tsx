import React, { JSX, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { putRequest } from '@utils/Axios/Axios.service';
import { getAuthErrorMessage } from '@utils/general/getAuthErrorMessage';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmailPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { EmailScreenProps } from '@screens/account/EmailScreen/EmailScreen.props';
import { EmailScreenStyle } from '@screens/account/EmailScreen/EmailScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';

// Sends a code to the new email, it's saved once VerifyEmailScreen confirms it
export const EmailScreen = ({ route }: EmailScreenProps): JSX.Element => {
  const { onboarding } = route.params ?? {};

  const { email: currentEmail } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const { navigateTo } = useNavigation(
    onboarding
      ? RootStackNavigatorEnum.OnboardingStack
      : RootStackNavigatorEnum.AccountStack
  );

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const trimmedEmail = email.trim();

  const onChangeEmail = useCallback((value: string) => {
    setEmail(value);
    setError(undefined);
  }, []);

  const sendCode = useCallback(() => {
    if (!trimmedEmail || posting) {
      return;
    }

    setPosting(true);

    putRequest<ResponseInterface, EmailPostInterface>(
      'user-email',
      { email: trimmedEmail },
      { errorBody: true }
    ).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (response?.status !== 'success') {
        trigger(HapticFeedbackTypes.notificationError);
        setError(getAuthErrorMessage(response));
        return;
      }

      navigateTo(AccountStackNavigatorEnum.VerifyEmailScreen, {
        email: trimmedEmail,
        onboarding
      });
    });
  }, [navigateTo, onboarding, posting, trimmedEmail]);

  const getTitle = () => {
    if (onboarding) {
      return 'Add your email';
    }
    return currentEmail ? 'Change email' : 'Add email';
  };

  return (
    <AuthLayout
      title={getTitle()}
      subtitle={
        currentEmail
          ? `Your email is ${currentEmail}. We'll send a code to the new one to confirm it.`
          : "If you ever forget your password, we'll send a code to this email so you can reset it."
      }
      step={onboarding ? 4 : undefined}
      totalSteps={onboarding ? 4 : undefined}
      // The first screen of the onboarding stack, there's nothing to go back to
      hideBack={onboarding}
      footer={
        <Button
          title="Continue"
          disabled={!trimmedEmail}
          posting={posting}
          onPress={sendCode}
          style={EmailScreenStyle.button}
        />
      }
    >
      <AuthInput
        autoFocus
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        returnKeyType="next"
        value={email}
        error={error}
        onChangeText={onChangeEmail}
        onSubmitEditing={sendCode}
      />
    </AuthLayout>
  );
};
