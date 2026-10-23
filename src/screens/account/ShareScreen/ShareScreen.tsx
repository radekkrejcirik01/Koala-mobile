import React, { JSX, useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import { EmotionType } from '@enums/EmotionType';
import { EMOTIONS } from '@constants/EMOTIONS';
import { filterSelected } from '@functions/filterSelected';
import { Send } from '@components/home/Send/Send';
import { EmotionItem } from '@components/home/EmotionItem/EmotionItem';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { ReducerProps } from '@store/index/index.props';
import {
  EMOTION_POSITIONS,
  ShareScreenStyle
} from '@screens/account/ShareScreen/ShareScreen.style';

export const ShareScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { name } = useSelector((state: ReducerProps) => state.user.user);

  const [emotion, setEmotion] = useState<EmotionType>();
  const { sending, sent, setSending, setSent } = useSending();

  const selectedFriends = useRef<number[]>([]);

  const selectedConfig = useMemo(
    () => EMOTIONS.find((item) => item.type === emotion),
    [emotion]
  );

  const title = selectedConfig?.message ?? `How are you feeling ${name}?`;

  const onEmotionSelect = useCallback(
    (type: EmotionType) => {
      setEmotion(type);
      setSent(false);
    },
    [setSent]
  );

  const onFriendSelect = (id: number) => {
    setSent(false);

    selectedFriends.current = filterSelected(selectedFriends.current, id);
  };

  const send = useCallback(() => {
    const selected = selectedFriends.current;

    if (!emotion) {
      Alert.alert('Please select how you are feeling first');
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
        message: selectedConfig?.message,
        emotion
      }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        setEmotion(undefined);
        selectedFriends.current = [];
      }
    });
  }, [emotion, selectedConfig, setSending, setSent]);

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
      <Text
        style={[ShareScreenStyle.title, { color: theme.theme.colors.text }]}
      >
        {title}
      </Text>
      <View style={ShareScreenStyle.contentView}>
        <View style={ShareScreenStyle.clusterView}>
          {EMOTIONS.map((item, index) => (
            <EmotionItem
              key={item.type}
              emotion={item}
              selected={emotion === item.type}
              onPress={() => onEmotionSelect(item.type)}
              style={[ShareScreenStyle.emotionItem, EMOTION_POSITIONS[index]]}
            />
          ))}
        </View>
      </View>
      <View style={ShareScreenStyle.sendView}>
        <KeyboardStickyView>
          <Send
            onFriendSelect={onFriendSelect}
            onPressSend={send}
            sending={sending}
            sent={sent}
            style={ShareScreenStyle.send}
          />
        </KeyboardStickyView>
      </View>
    </View>
  );
};
