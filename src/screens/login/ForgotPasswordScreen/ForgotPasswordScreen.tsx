import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { useTheme } from '@hooks/useTheme';
import { ForgotPasswordScreenStyle } from '@screens/login/ForgotPasswordScreen/ForgotPasswordScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';

const SUPPORT_EMAIL = 'support@koalasharing.com';

// Password reset is disabled on the backend until the email code flow ships
export const ForgotPasswordScreen = (): React.JSX.Element => {
  const theme = useTheme();

  const copyEmail = useCallback(() => {
    Clipboard.setString(SUPPORT_EMAIL);
    trigger(HapticFeedbackTypes.impactLight);
    Toast.show({ type: 'success', text1: 'Copied!' });
  }, []);

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Send us an email with your username and we'll help you get back into your account."
      footer={
        <Button
          title="Copy email"
          onPress={copyEmail}
          style={ForgotPasswordScreenStyle.button}
        />
      }
    >
      <View
        style={[
          ForgotPasswordScreenStyle.card,
          { backgroundColor: theme.theme.colors.surface }
        ]}
      >
        <Text style={ForgotPasswordScreenStyle.cardLabel}>Support</Text>
        <Text
          selectable
          style={[
            ForgotPasswordScreenStyle.email,
            { color: theme.theme.colors.text }
          ]}
        >
          {SUPPORT_EMAIL}
        </Text>
      </View>
    </AuthLayout>
  );
};
