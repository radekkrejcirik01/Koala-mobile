import React, { JSX, useCallback, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { SupportScreenStyle } from '@screens/account/SupportScreen/SupportScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import COLORS from '@constants/COLORS';
import { SendButton } from '@components/home/SendButton/SendButton';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { SupportPostInterface } from '@interfaces/post/Post.interface';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';

export const SupportScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { sending, setSending, sent, setSent } = useSending();

  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const send = useCallback(() => {
    if (!message) {
      Alert.alert('Please write a message first');
      return;
    }
    if (!email) {
      Alert.alert('Please write your email');
      return;
    }

    setSending(true);

    postRequest<ResponseInterface, SupportPostInterface>('support', {
      message,
      email
    }).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        setMessage('');
        setEmail('');
      }
    });
  }, [email, message, setSending, setSent]);

  return (
    <View style={[SupportScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Support" />
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={[
          SupportScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      >
        <FormIntro
          emoji="💬"
          emojiBackgroundColor={COLORS.GREEN}
          title="How can we help?"
        />
        <ProfileSection title="Message">
          <TextInput
            placeholder="What's going on..."
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            value={message}
            onChangeText={setMessage}
            multiline
            selectionColor={COLORS.BUTTON_BLUE}
            style={[
              SupportScreenStyle.input,
              { color: theme.theme.colors.text }
            ]}
          />
        </ProfileSection>
        <ProfileSection title="Email" footer="We will reply to this address.">
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            selectionColor={COLORS.BUTTON_BLUE}
            style={[
              SupportScreenStyle.emailInput,
              { color: theme.theme.colors.text }
            ]}
          />
        </ProfileSection>
        <View style={SupportScreenStyle.button}>
          <SendButton onPress={send} sending={sending} sent={sent} />
          {sent && (
            <Text style={SupportScreenStyle.thankText}>
              We got your message and will reply soon.
            </Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
