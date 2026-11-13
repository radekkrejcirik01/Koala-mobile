import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { ForgotPasswordScreenStyle } from '@screens/login/ForgotPasswordScreen/ForgotPasswordScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';

const SUPPORT_EMAIL = 'support@koalasharing.com';

// Password reset is disabled on the backend until the email code flow ships
export const ForgotPasswordScreen = (): React.JSX.Element => {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView style={{ marginTop: top }}>
      <ScreenHeader title="Forgot password" />
      <View style={ForgotPasswordScreenStyle.container}>
        <Text
          selectable
          style={[
            ForgotPasswordScreenStyle.text,
            { color: theme.theme.colors.text }
          ]}
        >
          Contact support at{' '}
          <Text style={ForgotPasswordScreenStyle.email}>{SUPPORT_EMAIL}</Text>{' '}
          with your username and we&apos;ll help you get back into your account.
        </Text>
      </View>
    </ScrollView>
  );
};
