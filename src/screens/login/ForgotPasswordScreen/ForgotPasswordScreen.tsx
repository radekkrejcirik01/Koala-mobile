import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@hooks/useNavigation';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { PasswordResetRequestPostInterface } from '@interfaces/post/Post.interface';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { ForgotPasswordScreenProps } from '@screens/login/ForgotPasswordScreen/ForgotPasswordScreen.props';
import { ForgotPasswordScreenStyle } from '@screens/login/ForgotPasswordScreen/ForgotPasswordScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';

const SUPPORT_EMAIL = 'support@koalasharing.com';

export const ForgotPasswordScreen = ({
  route
}: ForgotPasswordScreenProps): React.JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const [username, setUsername] = useState<string>(
    route.params?.username?.trim() ?? ''
  );
  const [error, setError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const trimmedUsername = username.trim();

  const onChangeUsername = useCallback((value: string) => {
    setUsername(value);
    setError(undefined);
  }, []);

  const sendCode = useCallback(() => {
    if (!trimmedUsername || posting) {
      return;
    }

    setPosting(true);

    postRequest<ResponseInterface, PasswordResetRequestPostInterface>(
      'password-reset/request',
      { username: trimmedUsername }
    ).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (response?.status !== 'success') {
        trigger(HapticFeedbackTypes.notificationError);
        setError('Something went wrong. Please try again.');
        return;
      }

      // The answer is the same whether the account exists or has an email,
      // so always move on and show it as it is
      navigateTo(LoginStackNavigatorEnum.ResetPasswordScreen, {
        username: trimmedUsername,
        message: response.message
      });
    });
  }, [navigateTo, posting, trimmedUsername]);

  const copySupportEmail = useCallback(() => {
    Clipboard.setString(SUPPORT_EMAIL);
    trigger(HapticFeedbackTypes.impactLight);
    Toast.show({ type: 'success', text1: 'Copied!' });
  }, []);

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your username and we'll email you a code to reset your password."
      footer={
        <Button
          title="Send code"
          disabled={!trimmedUsername}
          posting={posting}
          onPress={sendCode}
          style={ForgotPasswordScreenStyle.button}
        />
      }
    >
      <AuthInput
        autoFocus
        placeholder="Username"
        autoCapitalize="none"
        textContentType="username"
        autoComplete="username"
        returnKeyType="next"
        value={username}
        error={error}
        onChangeText={onChangeUsername}
        onSubmitEditing={sendCode}
      />
      <Text style={ForgotPasswordScreenStyle.supportText}>
        The code goes to the email you added in the app. If you never added one,
        contact us at{' '}
        <Text
          suppressHighlighting
          onPress={copySupportEmail}
          style={ForgotPasswordScreenStyle.supportLink}
        >
          {SUPPORT_EMAIL}
        </Text>{' '}
        and we'll help you get back into your account.
      </Text>
    </AuthLayout>
  );
};
