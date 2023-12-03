import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
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
import { NotificationsScreenHeader } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader';
import COLORS from '@constants/COLORS';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { Modal } from '@components/general/Modal/Modal';
import { FilterModal } from '@components/notifications/FilterModal/FilterModal';

export const NotificationsScreen = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { modalVisible, showModal, hideModal } = useModal();

    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );
    const [filterName, setFilterName] = useState<string>();
    const [loaded, setLoaded] = useState<boolean>(false);

    const filterUserId = useRef<number>();

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

    const loadFilteredNotifications = useCallback(
        (userId: number, lastId?: number) => {
            let endpoint = `filtered-notifications/${userId}`;
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
        },
        []
    );

    useEffect(() => {
        if (filterUserId.current) {
            loadFilteredNotifications(filterUserId.current);
        } else {
            loadNotifications();
        }
    }, [loadFilteredNotifications, loadNotifications]);

    const onFilterPress = () => {
        showModal();
    };

    const filterByUsername = useCallback(
        (userId: number, name: string) => {
            filterUserId.current = userId;
            setFilterName(name);

            loadFilteredNotifications(userId);
            hideModal();
        },
        [hideModal, loadFilteredNotifications]
    );

    const onClearFilter = useCallback(() => {
        filterUserId.current = null;
        setFilterName('');

        loadNotifications();
        hideModal();
    }, [hideModal, loadNotifications]);

    const renderItem = useCallback(
        ({
            item
        }: ListRenderItemInfo<NotificationInterface>): React.JSX.Element => (
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
            if (filterUserId.current) {
                loadFilteredNotifications(
                    filterUserId.current,
                    notifications[notifications?.length - 1].id
                );
            } else {
                loadNotifications(notifications[notifications?.length - 1].id);
            }
        }
    }, [loadFilteredNotifications, loadNotifications, notifications]);

    return (
        <View style={[NotificationsScreenStyle.container, { paddingTop: top }]}>
            <NotificationsScreenHeader
                onFilterPress={onFilterPress}
                filterName={filterName}
            />
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
                content={
                    <FilterModal
                        onFriendPress={filterByUsername}
                        onClearFilter={onClearFilter}
                    />
                }
                onClose={hideModal}
                style={NotificationsScreenStyle.modal}
            />
        </View>
    );
};
