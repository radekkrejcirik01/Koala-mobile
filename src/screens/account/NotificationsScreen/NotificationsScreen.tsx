import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    RefreshControl,
    Text,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseNotificationsGetInterface } from '@interfaces/response/Response.interface';
import { NotificationInterface } from '@interfaces/general.interface';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationItem } from '@components/notifications/NotificationItem/NotificationItem';
import { setUnseenNotifications } from '@store/NotificationsReducer';
import { NotificationsHeader } from '@components/notifications/NotificationsHeader/NotificationsHeader';
import COLORS from '@constants/COLORS';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/home/FriendsModalScreen/FriendsModalScreen';

export const NotificationsScreen = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { modalVisible, showModal, hideModal } = useModal();

    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);
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
                            setNotifications((value) =>
                                value.concat(response.data)
                            );
                        }
                    }

                    setLoaded(true);
                }
            );
        },
        [dispatch]
    );

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const addFriends = useCallback(() => {
        hideModal();
        setModalContent(<FriendsModalScreen />);
        showModal();
    }, [hideModal, showModal]);

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const renderItem = useCallback(
        ({
            item
        }: ListRenderItemInfo<NotificationInterface>): React.JSX.Element => (
            <NotificationItem
                item={item}
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.ChatScreen, {
                        id: item.id,
                        senderId: item?.senderId,
                        name: item.name,
                        username: item?.sender,
                        conversationId: item?.conversationId,
                        isStatusReply:
                            item?.type ===
                            NotificationItemEnum.StatusReplyNotificationType,
                        isCheckOnMessage:
                            item?.type ===
                            NotificationItemEnum.CheckOnMessageNotificationType
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

    return (
        <View style={[NotificationsScreenStyle.container, { paddingTop: top }]}>
            <NotificationsHeader onPlusPress={addFriends} />
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
                            Nothing shared yet
                        </Text>
                    ) : (
                        <ActivityIndicator
                            color={COLORS.BUTTON_BLUE}
                            style={NotificationsScreenStyle.activityIndicator}
                        />
                    )
                }
            />
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={NotificationsScreenStyle.modal}
            />
        </View>
    );
};
