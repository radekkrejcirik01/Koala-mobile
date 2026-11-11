import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { getRequest } from '@utils/Axios/Axios.service';
import { NotificationsService } from '@utils/general/NotificationsService';
import { ResponseChatsGetInterface } from '@interfaces/response/Response.interface';
import { ChatInterface } from '@interfaces/general.interface';
import { ChatsScreenStyle } from '@screens/account/ChatsScreen/ChatsScreen.style';
import { ChatItem } from '@components/chats/ChatItem/ChatItem';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AddButton } from '@components/general/AddButton/AddButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Loader } from '@components/general/Loader/Loader';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';

export const ChatsScreen = (): React.JSX.Element => {
  const { top } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

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

  // On new message, only while focused
  useFocusEffect(
    useCallback(
      () =>
        messaging().onMessage(
          (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            if (remoteMessage) {
              trigger(HapticFeedbackTypes.impactMedium);
              loadChats();
            }
          }
        ),
      [loadChats]
    )
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ChatInterface>): React.JSX.Element => (
      <ChatItem
        item={item}
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
    [navigateTo]
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
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
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
