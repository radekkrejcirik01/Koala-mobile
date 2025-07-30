import React, { JSX, useCallback, useRef, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { DirectSharingModalScreenProps } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen.props';
import { DirectSharingModalScreenStyle } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen.style';
import { filterSelected } from '@functions/filterSelected';
import { Send } from '@components/home/Send/Send';
import { useTheme } from '@contexts/ThemeContext';

export const DirectSharingModalScreen = ({
  onAddFriendPress
}: DirectSharingModalScreenProps): JSX.Element => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

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
        DirectSharingModalScreenStyle.container,
        {
          backgroundColor: theme.theme.colors.surface,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <View style={DirectSharingModalScreenStyle.inputView}>
        <TextInput
          multiline
          placeholder="What's happening??"
          placeholderTextColor={COLORS.GRAY_200}
          autoFocus
          autoCorrect={false}
          value={message}
          onChangeText={setMessage}
          selectionColor={COLORS.BUTTON_BLUE}
          style={[
            DirectSharingModalScreenStyle.input,
            { color: theme.theme.colors.text }
          ]}
        />
      </View>
      <Send
        onFriendSelect={onFriendSelect}
        onAddFriendPress={onAddFriendPress}
        onPressSend={send}
        sending={sending}
        sent={sent}
        style={DirectSharingModalScreenStyle.send}
      />
    </View>
  );
};
