import React, { JSX, useCallback, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { SendModalScreenProps } from '@components/home/SendModalScreen/SendModalScreen.props';
import { SendModalScreenStyle } from '@components/home/SendModalScreen/SendModalScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import { CanHelp } from '@components/home/CanHelp/CanHelp';
import { filterSelected } from '@functions/filterSelected';
import { Send } from '@components/home/Send/Send';
import { useTheme } from '@contexts/ThemeContext';

export const SendModalScreen = ({
  item,
  onAddFriendPress
}: SendModalScreenProps): JSX.Element => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { sending, sent, setSending, setSent } = useSending();

  const selectedFriends = useRef<number[]>([]);

  const onFriendSelect = (id: number) => {
    setSent(false);

    selectedFriends.current = filterSelected(selectedFriends.current, id);
  };

  const send = useCallback(() => {
    const selected = selectedFriends.current;

    if (!selected.length) {
      Alert.alert('Please select a friend first');
      return;
    }

    setSending(true);

    postRequest<ResponseInterface, EmotionMessagePostInterface>(
      'emotion-message',
      {
        ids: selected,
        message: item.message
      }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        selectedFriends.current = [];
      }
    });
  }, [item.message, setSending, setSent]);

  return (
    <View
      style={[
        SendModalScreenStyle.container,
        {
          backgroundColor: theme.theme.colors.surface,
          paddingBottom: bottom + 10
        }
      ]}
    >
      <Text
        style={[
          SendModalScreenStyle.messageText,
          { color: theme.theme.colors.text }
        ]}
      >
        {item.message}
      </Text>
      <View style={SendModalScreenStyle.content}>
        <CanHelp tip1={item?.tip1} tip2={item?.tip2} />
        <Send
          onFriendSelect={onFriendSelect}
          onAddFriendPress={onAddFriendPress}
          onPressSend={send}
          sending={sending}
          sent={sent}
          style={SendModalScreenStyle.send}
        />
      </View>
    </View>
  );
};
