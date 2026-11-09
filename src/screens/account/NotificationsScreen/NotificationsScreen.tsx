import React, { useCallback, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseNotificationsGetInterface } from '@interfaces/response/Response.interface';
import { NotificationInterface } from '@interfaces/general.interface';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationItem } from '@components/notifications/NotificationItem/NotificationItem';
import { setUnseenNotifications } from '@store/NotificationsReducer';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AddButton } from '@components/general/AddButton/AddButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Loader } from '@components/general/Loader/Loader';

export const NotificationsScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadNotifications = useCallback(
    (lastId?: number) => {
      let endpoint = 'notifications';
      if (lastId) {
        endpoint += `/${lastId}`;
      }

      getRequest<ResponseNotificationsGetInterface>(endpoint).subscribe(
        (response: ResponseNotificationsGetInterface) => {
          if (response?.status) {
            dispatch(setUnseenNotifications(0));

            if (!lastId) {
              setNotifications(response.data);

              setLoaded(true);
              return;
            }

            if (lastId && !!response?.data?.length) {
              setNotifications((value) => value.concat(response.data));
            }
          }

          setLoaded(true);
        }
      );
    },
    [dispatch]
  );

  useFocusEffect(loadNotifications);

  // On new message, only while focused as loading clears the unseen badge
  useFocusEffect(
    useCallback(
      () =>
        messaging().onMessage(
          (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            if (remoteMessage) {
              trigger(HapticFeedbackTypes.impactMedium);
              loadNotifications();
            }
          }
        ),
      [loadNotifications]
    )
  );

  const renderItem = useCallback(
    ({
      item
    }: ListRenderItemInfo<NotificationInterface>): React.JSX.Element => (
      <NotificationItem
        item={item}
        onPress={() => {
          navigateTo(AccountStackNavigatorEnum.ChatScreen, {
            id: item.id,
            chatUserId: item.senderId,
            name: item.name,
            profilePhoto: item?.profilePhoto,
            username: item.sender,
            conversationId: item?.conversationId
          });
          // Mark as seen once the chat covers the list, the next load
          // replaces it with the server state
          setTimeout(() => {
            setNotifications((value) =>
              value.map((notification) =>
                notification.id === item.id
                  ? { ...notification, seen: 1 }
                  : notification
              )
            );
          }, 500);
        }}
      />
    ),
    [navigateTo]
  );

  const onEndReached = useCallback(() => {
    if (notifications?.length >= 20) {
      loadNotifications(notifications[notifications?.length - 1].id);
    }
  }, [loadNotifications, notifications]);

  return (
    <View
      style={[
        NotificationsScreenStyle.container,
        { paddingTop: Math.max(top - 6, 0) }
      ]}
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
        data={notifications}
        renderItem={renderItem}
        estimatedItemSize={80}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
        contentContainerStyle={NotificationsScreenStyle.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);

              setTimeout(() => {
                setRefreshing(false);
                loadNotifications();
              }, 750);
            }}
          />
        }
        ListEmptyComponent={
          loaded ? (
            <Text style={NotificationsScreenStyle.listEmptyText}>
              No messages yet
            </Text>
          ) : null
        }
      />
      {!loaded && <Loader />}
    </View>
  );
};
