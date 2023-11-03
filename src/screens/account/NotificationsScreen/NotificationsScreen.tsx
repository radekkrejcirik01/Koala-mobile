import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
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
import { NotificationsScreenHeader } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader';
import COLORS from '@constants/COLORS';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const NotificationsScreen = (): JSX.Element => {
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

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

    useFocusEffect(loadNotifications);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<NotificationInterface>): JSX.Element => (
            <NotificationItem
                item={item}
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.RespondScreen, {
                        id: item.id,
                        name: item.name,
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

    return (
        <View style={[NotificationsScreenStyle.container, { paddingTop: top }]}>
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
                            No one shared yet
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
