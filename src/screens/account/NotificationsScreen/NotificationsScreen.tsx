import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
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

export const NotificationsScreen = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );

    const loadNotifications = useCallback((lastId?: number) => {
        let endpoint = 'notifications';
        if (lastId) {
            endpoint += `/${lastId}`;
        }

        getRequest<ResponseNotificationsGetInterface>(endpoint).subscribe(
            (response: ResponseNotificationsGetInterface) => {
                if (response?.status) {
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
            }
        );
    }, []);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const sendSupport = useCallback(
        (receiver: string, message: string) => {
            postRequest<ResponseInterface, SupportNotificationPostInterface>(
                'support-notification',
                {
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
                onSendSupport={() => sendSupport(item.sender, item.message)}
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
        <View style={NotificationsScreenStyle.container}>
            <FlashList
                data={notifications}
                renderItem={renderItem}
                estimatedItemSize={80}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={onEndReached}
                contentContainerStyle={NotificationsScreenStyle.listContainer}
            />
        </View>
    );
};
