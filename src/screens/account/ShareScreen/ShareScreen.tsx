import React, { JSX, useCallback, useRef, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { filterSelected } from '@functions/filterSelected';
import { Send } from '@components/home/Send/Send';
import { useTheme } from '@contexts/ThemeContext';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { ShareScreenStyle } from '@screens/account/ShareScreen/ShareScreen.style';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';

export const ShareScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { name } = useSelector((state: ReducerProps) => state.user.user);

  const [message, setMessage] = useState<string>();
  const { sending, sent, setSending, setSent } = useSending();

  const selectedFriends = useRef<number[]>([]);

  const onFriendSelect = (id: number) => {
    setSent(false);

    selectedFriends.current = filterSelected(selectedFriends.current, id);
  };

  const send = useCallback(() => {
    const selected = selectedFriends.current;

    if (!message?.length) {
      Alert.alert('Please write a message first');
      return;
    }
    if (!selected.length) {
      Alert.alert('Please select a friend first');
      return;
    }

    setSending(true);

    postRequest<ResponseInterface, EmotionMessagePostInterface>(
      'emotion-message/direct',
      {
        ids: selected,
        message
      }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        setMessage('');
        selectedFriends.current = [];
      }
    });
  }, [message, setSending, setSent]);

  return (
    <View
      style={[
        ShareScreenStyle.container,
        {
          backgroundColor: theme.theme.colors.background,
          paddingTop: top || 10,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <ScreenHeader title="Share" />
      <View style={ShareScreenStyle.inputView}>
        <TextInput
          multiline
          placeholder={`What is happening ${name}?`}
          placeholderTextColor={COLORS.GRAY_200}
          autoFocus
          autoCorrect={false}
          value={message}
          onChangeText={(value) => {
            setMessage(value);
          }}
          selectionColor={COLORS.BUTTON_BLUE}
          style={[ShareScreenStyle.input, { color: theme.theme.colors.text }]}
        />
      </View>
      <KeyboardAvoidingView>
        <Send
          onFriendSelect={onFriendSelect}
          onAddFriendPress={() => {}}
          onPressSend={send}
          sending={sending}
          sent={sent}
          style={ShareScreenStyle.send}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
