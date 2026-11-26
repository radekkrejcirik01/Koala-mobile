import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useJumpToMessage } from '@hooks/useJumpToMessage';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseChatEmotionsGetInterface } from '@interfaces/response/Response.interface';
import { MessageInterface } from '@interfaces/general.interface';
import { ReducerProps } from '@store/index/index.props';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';
import { ChatEmotionsScreenProps } from '@screens/account/ChatEmotionsScreen/ChatEmotionsScreen.props';
import { useChatEmotionsScreenStyle } from '@screens/account/ChatEmotionsScreen/ChatEmotionsScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Loader } from '@components/general/Loader/Loader';
import { SharedEmotionItem } from '@components/emotions/SharedEmotionItem/SharedEmotionItem';

export const ChatEmotionsScreen = ({
  route
}: ChatEmotionsScreenProps): JSX.Element => {
  const ChatEmotionsScreenStyle = useChatEmotionsScreenStyle();
  const { friend } = route.params;

  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);
  const { top, bottom } = useSafeAreaInsets();
  const { jumpTo, jumpingId } = useJumpToMessage(friend);

  // Whose emotions are shown, both when not set
  const [senderId, setSenderId] = useState<number>();
  // Undefined until the first page loaded
  const [emotions, setEmotions] = useState<MessageInterface[]>();
  // From the first page, the same for every filter
  const [counts, setCounts] = useState<{ user: number; friend: number }>();

  const hasMore = useRef<boolean>(false);
  const loadingMore = useRef<boolean>(false);
  // A response for the previous filter is ignored
  const currentSenderId = useRef<number>(senderId);
  currentSenderId.current = senderId;

  const load = useCallback(
    (lastId?: number) => {
      const params = [
        senderId ? `senderId=${senderId}` : '',
        lastId ? `lastId=${lastId}` : ''
      ]
        .filter(Boolean)
        .join('&');

      getRequest<ResponseChatEmotionsGetInterface>(
        `chats/${friend.id}/emotions${params ? `?${params}` : ''}`
      ).subscribe((response: ResponseChatEmotionsGetInterface) => {
        loadingMore.current = false;

        if (!response?.status || currentSenderId.current !== senderId) {
          return;
        }

        const data = response.data ?? [];
        hasMore.current = data.length >= PAGE_SIZE;
        setEmotions((prevState) =>
          lastId ? (prevState ?? []).concat(data) : data
        );

        if (!lastId) {
          setCounts({
            user: response.userCount ?? 0,
            friend: response.friendCount ?? 0
          });
        }
      });
    },
    [friend.id, senderId]
  );

  useEffect(() => {
    setEmotions(undefined);
    load();
  }, [load]);

  const loadMore = useCallback(() => {
    const last = emotions?.[emotions.length - 1];
    if (!hasMore.current || loadingMore.current || !last) {
      return;
    }

    loadingMore.current = true;
    load(last.id);
  }, [emotions, load]);

  const filters = [
    {
      senderId: undefined,
      label: 'All',
      count: counts && counts.user + counts.friend
    },
    {
      senderId: friend.id,
      label: friend.name,
      count: counts?.friend
    },
    { senderId: userId, label: 'You', count: counts?.user }
  ];

  return (
    <View style={[ChatEmotionsScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Shared emotions" />
      <View style={ChatEmotionsScreenStyle.segmentedView}>
        {filters.map((item) => {
          const active = item.senderId === senderId;
          return (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              onPress={() => {
                if (!active) {
                  trigger(HapticFeedbackTypes.impactLight);
                  setSenderId(item.senderId);
                }
              }}
              style={[
                ChatEmotionsScreenStyle.segment,
                active && ChatEmotionsScreenStyle.segmentActive
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  ChatEmotionsScreenStyle.segmentText,
                  active && ChatEmotionsScreenStyle.segmentTextActive
                ]}
              >
                {item.count === undefined
                  ? item.label
                  : `${item.label} ${item.count}`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        data={emotions ?? []}
        extraData={jumpingId}
        keyExtractor={(item: MessageInterface) => String(item.id)}
        renderItem={({ item }) => (
          <SharedEmotionItem
            item={item}
            onPress={() => {
              if (jumpingId === undefined) {
                jumpTo(item.id);
              }
            }}
          />
        )}
        onEndReached={loadMore}
        ListEmptyComponent={
          emotions ? (
            <Text style={ChatEmotionsScreenStyle.emptyText}>
              No shared emotions yet
            </Text>
          ) : null
        }
        contentContainerStyle={[
          ChatEmotionsScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      />
      {!emotions && <Loader />}
    </View>
  );
};
