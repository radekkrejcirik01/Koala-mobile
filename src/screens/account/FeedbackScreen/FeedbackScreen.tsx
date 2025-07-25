import React, { JSX, useCallback, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { FeedbackScreenStyle } from '@screens/account/FeedbackScreen/FeedbackScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import COLORS from '@constants/COLORS';
import { SendButton } from '@components/home/SendButton/SendButton';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { FeedbackPostInterface } from '@interfaces/post/Post.interface';
import { useTheme } from '../../../ThemeContext';

export const FeedbackScreen = (): JSX.Element => {
  const { top } = useSafeAreaInsets();
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
    <View style={[FeedbackScreenStyle.container, { top }]}>
      <ScreenHeader title="Feedback" />
      <Text
        style={[FeedbackScreenStyle.title, { color: theme.theme.colors.text }]}
      >{`Share with us what you like or don't like about our app`}</Text>
      <TextInput
        placeholder="Message..."
        placeholderTextColor={COLORS.GRAY_200}
        value={message}
        onChangeText={setMessage}
        multiline
        selectionColor={COLORS.BUTTON_BLUE}
        style={[
          FeedbackScreenStyle.input,
          {
            backgroundColor: theme.theme.colors.surface,
            color: theme.theme.colors.text
          }
        ]}
      />
      <View style={FeedbackScreenStyle.button}>
        <SendButton onPress={send} sending={sending} sent={sent} />
        {sent && (
          <Text
            style={[
              FeedbackScreenStyle.thankText,
              { color: theme.theme.colors.text }
            ]}
          >
            Thank you! We got your feedback
          </Text>
        )}
      </View>
    </View>
  );
};
