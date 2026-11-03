import React, { JSX, useCallback, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { FeedbackScreenStyle } from '@screens/account/FeedbackScreen/FeedbackScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import COLORS from '@constants/COLORS';
import { SendButton } from '@components/home/SendButton/SendButton';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { FeedbackPostInterface } from '@interfaces/post/Post.interface';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';

export const FeedbackScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { sending, setSending, sent, setSent } = useSending();

  const [message, setMessage] = useState<string>();

  const send = useCallback(() => {
    if (!message) {
      Alert.alert('Please write a feedback first');
      return;
    }

    setSending(true);

    postRequest<ResponseInterface, FeedbackPostInterface>('feedback', {
      message
    }).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        setMessage('');
      }
    });
  }, [message, setSending, setSent]);

  return (
    <View style={[FeedbackScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Feedback" />
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={[
          FeedbackScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      >
        <FormIntro
          emoji="⭐️"
          emojiBackgroundColor={COLORS.PASTEL_YELLOW}
          title="Tell us what you think"
        />
        <ProfileSection title="Feedback">
          <TextInput
            placeholder="Your thoughts..."
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            value={message}
            onChangeText={setMessage}
            multiline
            selectionColor={COLORS.BUTTON_BLUE}
            style={[
              FeedbackScreenStyle.input,
              { color: theme.theme.colors.text }
            ]}
          />
        </ProfileSection>
        <View style={FeedbackScreenStyle.button}>
          <SendButton onPress={send} sending={sending} sent={sent} />
          {sent && (
            <Text style={FeedbackScreenStyle.thankText}>
              Thank you! We got your feedback.
            </Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
