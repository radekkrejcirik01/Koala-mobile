import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { getRequest, postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import { NotificationInterface } from '@interfaces/general.interface';
import { SupportNotificationPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import { NotificationItem } from '@components/notifications/NotificationItem/NotificationItem';
import { setUnseenNotifications } from '@store/NotificationsReducer';
import { NotificationsScreenHeader } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader';
import COLORS from '@constants/COLORS';

export const NotificationsScreen = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const { top, bottom } = useSafeAreaInsets();

    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);

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

    const sendSupport = useCallback(
        (id: number, receiver: string, message: string) => {
            postRequest<ResponseInterface, SupportNotificationPostInterface>(
                'support-notification',
                {
                    id,
                    receiver,
                    name,
                    message
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    // Alert.alert(response?.message);
                }
            });
        },
        [name]
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationInterface>): JSX.Element => (
            <NotificationItem
                item={item}
                onSendSupport={() =>
                    sendSupport(item.id, item.sender, item.message)
                }
            />
        ),
        [sendSupport]
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
                { paddingTop: top, paddingBottom: bottom }
            ]}
        >
            <NotificationsScreenHeader />
            <FlashList
                data={notifications}
                renderItem={renderItem}
                estimatedItemSize={80}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={onEndReached}
                contentContainerStyle={NotificationsScreenStyle.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loaded ? (
                        <Text style={NotificationsScreenStyle.listEmptyText}>
                            No notifications yet
                        </Text>
                    ) : (
                        <ActivityIndicator
                            color={COLORS.BUTTON_BLUE}
                            style={NotificationsScreenStyle.activityIndicator}
                        />
                    )
                }
            />
        </View>
    );
};
