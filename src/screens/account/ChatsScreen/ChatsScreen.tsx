import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { getRequest } from '@utils/Axios/Axios.service';
import { NotificationsService } from '@utils/general/NotificationsService';
import { LiveService } from '@utils/general/LiveService';
import { ResponseChatsGetInterface } from '@interfaces/response/Response.interface';
import { ChatInterface } from '@interfaces/general.interface';
import { useChatsScreenStyle } from '@screens/account/ChatsScreen/ChatsScreen.style';
import { ChatItem } from '@components/chats/ChatItem/ChatItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AddButton } from '@components/general/AddButton/AddButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Loader } from '@components/general/Loader/Loader';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';
import { ReducerProps } from '@store/index/index.props';
import { LiveEventType } from '@enums/LiveEventType';
import { ChatActivityType } from '@enums/ChatActivityType';

export const ChatsScreen = (): React.JSX.Element => {
  const ChatsScreenStyle = useChatsScreenStyle();
  const { top } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);
  const typingIds = useSelector((state: ReducerProps) => state.live.typingIds);

  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const hasMore = useRef<boolean>(false);

  // The next page starts after the given chat
  const loadChats = useCallback((last?: ChatInterface) => {
    // Chats move to the top on new activity, so a refresh starts over
    getRequest<ResponseChatsGetInterface>(
      last
        ? `chats?lastTimeMs=${last.lastActivity.timeMs}&lastId=${last.id}`
        : 'chats'
    ).subscribe((response: ResponseChatsGetInterface) => {
      if (response?.status) {
        const data = response.data ?? [];
        hasMore.current = data.length >= PAGE_SIZE;

        setChats((value) => (last ? value.concat(data) : data));
      }

      setLoaded(true);
    });

    if (!last) {
      NotificationsService.getUnreadChats();
    }
  }, []);

  useFocusEffect(useCallback(() => loadChats(), [loadChats]));

  // Changes may have been missed while disconnected
  useFocusEffect(
    useCallback(() => LiveService.onConnect(() => loadChats()), [loadChats])
  );

  // Live changes, only while focused as focusing loads the list again
  useFocusEffect(
    useCallback(
      () =>
        LiveService.subscribe((event) => {
          switch (event.type) {
            case LiveEventType.MessageNew: {
              const { friendId, message } = event.data;
              const fromFriend = message.senderId === friendId;

              if (fromFriend) {
                trigger(HapticFeedbackTypes.impactMedium);
              }

              // A new chat, or one further down than the loaded pages
              if (!chats.some((item) => item.friend.id === friendId)) {
                loadChats();
                break;
              }

              // Moves to the top, sending marks it read for the user
              setChats((value) => {
                const chat = value.find((item) => item.friend.id === friendId);
                if (!chat) {
                  return value;
                }

                return [
                  {
                    ...chat,
                    lastActivity: {
                      type: ChatActivityType.Message,
                      userId: message.senderId,
                      timeMs: message.time * 1000,
                      message
                    },
                    unread: fromFriend
                  },
                  ...value.filter((item) => item !== chat)
                ];
              });
              break;
            }
            // The preview may fall back to an older message and the unread
            // state depends on who reacted
            case LiveEventType.MessageDeleted:
            case LiveEventType.MessageReaction:
              loadChats();
              break;
            // Read on this or another device
            case LiveEventType.ChatRead: {
              const { friendId, readerId } = event.data;
              if (readerId === userId) {
                setChats((value) =>
                  value.map((item) =>
                    item.friend.id === friendId
                      ? { ...item, unread: false }
                      : item
                  )
                );
              }
              break;
            }
            default:
          }
        }),
      [chats, loadChats, userId]
    )
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ChatInterface>): React.JSX.Element => (
      <ChatItem
        item={item}
        typing={typingIds.includes(item.friend.id)}
        onPress={() => {
          navigateTo(AccountStackNavigatorEnum.ChatScreen, item.friend);
          // Mark as read once the chat covers the list, the next load
          // replaces it with the server state
          setTimeout(() => {
            setChats((value) =>
              value.map((chat) =>
                chat.id === item.id ? { ...chat, unread: false } : chat
              )
            );
          }, 500);
        }}
      />
    ),
    [navigateTo, typingIds]
  );

  const onEndReached = useCallback(() => {
    if (hasMore.current) {
      hasMore.current = false;
      loadChats(chats[chats.length - 1]);
    }
  }, [chats, loadChats]);

  return (
    <View
      style={[ChatsScreenStyle.container, { paddingTop: Math.max(top - 6, 0) }]}
    >
      <ScreenHeader
        title="Chats"
        rightComponent={
          <AddButton
            onPress={() => navigateTo(AccountStackNavigatorEnum.FriendsScreen)}
          />
        }
      />
      <FlashList
        data={chats}
        renderItem={renderItem}
        extraData={typingIds}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
        maintainVisibleContentPosition={{ disabled: true }}
        contentContainerStyle={ChatsScreenStyle.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);

              setTimeout(() => {
                setRefreshing(false);
                loadChats();
              }, 750);
            }}
          />
        }
        ListEmptyComponent={
          loaded ? (
            <Text style={ChatsScreenStyle.listEmptyText}>No messages yet</Text>
          ) : null
        }
      />
      {!loaded && <Loader />}
    </View>
  );
};
