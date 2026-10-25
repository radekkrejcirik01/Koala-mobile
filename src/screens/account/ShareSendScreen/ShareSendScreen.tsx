import React, { JSX, useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { useFriends } from '@hooks/useFriends';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import { EMOTIONS } from '@constants/EMOTIONS';
import { filterSelected } from '@functions/filterSelected';
import COLORS from '@constants/COLORS';
import { FriendListItem } from '@components/friends/FriendListItem/FriendListItem';
import { AddFriendsDescriptionButton } from '@components/friends/AddFriendsDescriptionButton/AddFriendsDescriptionButton';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { ShareSendScreenProps } from '@screens/account/ShareSendScreen/ShareSendScreen.props';
import { ShareSendScreenStyle } from '@screens/account/ShareSendScreen/ShareSendScreen.style';

export const ShareSendScreen = ({
  route
}: ShareSendScreenProps): JSX.Element => {
  const { emotion } = route.params;

  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { dismiss } = useNavigation();
  const { sending, sent, setSending, setSent } = useSending();
  const { friends, loaded } = useFriends();

  const selectedFriends = useRef<number[]>([]);

  const config = useMemo(
    () => EMOTIONS.find((item) => item.type === emotion),
    [emotion]
  );

  const onFriendSelect = (id: number) => {
    setSent(false);

    selectedFriends.current = filterSelected(selectedFriends.current, id);
  };

  const send = useCallback(() => {
    if (sending) {
      return;
    }

    const selected = selectedFriends.current;

    if (!selected.length) {
      Alert.alert('Please select a friend first');
      return;
    }

    setSending(true);

    postRequest<ResponseInterface, EmotionMessagePostInterface>(
      'emotion-message/direct',
      {
        ids: selected,
        message: config?.message,
        emotion
      }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        selectedFriends.current = [];

        setTimeout(dismiss, 1000);
        return;
      }

      setSending(false);
      Alert.alert('Failed to send. Please try again.');
    });
  }, [config, dismiss, emotion, sending, setSending, setSent]);

  return (
    <View
      style={[
        ShareSendScreenStyle.container,
        {
          backgroundColor: theme.theme.colors.background,
          paddingTop: 10,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <ScreenHeader title="Share to" />
      <View style={ShareSendScreenStyle.listView}>
        {loaded ? (
          friends?.length ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {friends.map((item) => (
                <FriendListItem
                  key={item.username}
                  item={item}
                  onSelect={() => onFriendSelect(item.id)}
                  sent={sent}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={ShareSendScreenStyle.centerView}>
              <AddFriendsDescriptionButton />
            </View>
          )
        ) : (
          <View style={ShareSendScreenStyle.centerView}>
            <ActivityIndicator color={COLORS.BUTTON_BLUE} />
          </View>
        )}
      </View>
      <View style={ShareSendScreenStyle.sendButtonView}>
        <HomeButton
          text={sent ? 'Done' : sending ? 'Sending...' : 'Send'}
          onPress={send}
        />
      </View>
    </View>
  );
};
