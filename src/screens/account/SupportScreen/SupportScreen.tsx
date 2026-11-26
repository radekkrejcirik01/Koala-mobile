import React, { JSX, useCallback, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { useSupportScreenStyle } from '@screens/account/SupportScreen/SupportScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import COLORS from '@constants/COLORS';
import { SendButton } from '@components/home/SendButton/SendButton';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { SupportPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';

export const SupportScreen = (): JSX.Element => {
  const SupportScreenStyle = useSupportScreenStyle();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { sending, setSending, sent, setSent } = useSending();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  // Replies go to the account email
  const { email } = useSelector((state: ReducerProps) => state.user.user);

  const [message, setMessage] = useState<string>();

  const send = useCallback(() => {
    if (!message) {
      Alert.alert('Please write a message first');
      return;
    }
    if (!email) {
      Alert.alert('Please add an email so we can reply to you');
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
        <ProfileSection
          title="Message"
          footer={email ? 'We will reply to your email' : undefined}
        >
          <TextInput
            placeholder="What's going on..."
            placeholderTextColor={theme.theme.colors.placeholder}
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
        {!email && (
          <ProfileSection footer="We need your email to reply to you">
            <ProfileItem
              onPress={() => navigateTo(AccountStackNavigatorEnum.EmailScreen)}
              icon="✉️"
              iconBackgroundColor={COLORS.PASTEL_PURPLE}
              title="Add email"
              isLast
            />
          </ProfileSection>
        )}
        <View style={SupportScreenStyle.button}>
          <SendButton onPress={send} sending={sending} sent={sent} />
          {sent && (
            <Text style={SupportScreenStyle.thankText}>
              We got your message and will reply soon
            </Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
