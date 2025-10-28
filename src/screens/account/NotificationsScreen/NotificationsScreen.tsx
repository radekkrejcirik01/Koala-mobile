import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  RefreshControl,
  Text,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseNotificationsGetInterface } from '@interfaces/response/Response.interface';
import { NotificationInterface } from '@interfaces/general.interface';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationItem } from '@components/notifications/NotificationItem/NotificationItem';
import { setUnseenNotifications } from '@store/NotificationsReducer';
import COLORS from '@constants/COLORS';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AddButton } from '@components/general/AddButton/AddButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { useModal } from '@hooks/useModal';

export const NotificationsScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const { modalVisible, showModal, hideModal } = useModal();

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

  const renderItem = useCallback(
    ({
      item
    }: ListRenderItemInfo<NotificationInterface>): React.JSX.Element => (
      <NotificationItem
        item={item}
        onPress={() =>
          navigateTo(AccountStackNavigatorEnum.ChatScreen, {
            id: item.id,
            chatUserId: item.senderId,
            name: item.name,
            profilePhoto: item?.profilePhoto,
            username: item.sender,
            conversationId: item?.conversationId
          })
        }
      />
    ),
    [navigateTo]
  );

  const onEndReached = useCallback(() => {
    if (notifications?.length >= 20) {
      loadNotifications(notifications[notifications?.length - 1].id);
    }
  }, [loadNotifications, notifications]);

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View style={[NotificationsScreenStyle.container, { marginTop: top }]}>
      <ScreenHeader
        title="My Chats"
        rightComponent={<AddButton onPress={showModal} />}
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
          ) : (
            <ActivityIndicator
              color={COLORS.LIGHTGRAY}
              style={NotificationsScreenStyle.activityIndicator}
            />
          )
        }
      />
      <Modal
        isVisible={modalVisible}
        content={<FriendsModalScreen />}
        onClose={hideModalAndKeyboard}
        style={NotificationsScreenStyle.modal}
      />
    </View>
  );
};
