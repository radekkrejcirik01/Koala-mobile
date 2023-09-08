import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileModalScreenStyle } from '@components/home/ProfileModalScreen/ProfileModalScreen.style';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseHistoryGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { HistoryInterface } from '@interfaces/general.interface';
import { HistoryItem } from '@components/home/HistoryItem/HistoryItem';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { resetUserState } from '@store/UserReducer';

export const ProfileModalScreen = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const { top, bottom } = useSafeAreaInsets();

    const [history, setHistory] = useState<HistoryInterface[]>([]);
    const [showAccount, setShowAccount] = useState<boolean>(false);

    const loadHistory = useCallback((lastId?: number) => {
        let endpoint = 'history';
        if (lastId) {
            endpoint += `/${lastId}`;
        }

        getRequest<ResponseHistoryGetInterface>(endpoint).subscribe(
            (response: ResponseHistoryGetInterface) => {
                if (response?.status) {
                    if (!lastId) {
                        setHistory(response.data);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setHistory((value) => value.concat(response.data));
                    }
                }
            }
        );
    }, []);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<HistoryInterface>): JSX.Element => (
            <HistoryItem item={item} />
        ),
        []
    );

    const onEndReached = useCallback(() => {
        if (history?.length >= 20) {
            loadHistory(history[history?.length - 1].id);
        }
    }, [history, loadHistory]);

    const deleteAccount = () => {
        deleteRequest<ResponseInterface>('account').subscribe(
            (response: ResponseInterface) => {
                if (response?.status) {
                    dispatch(resetUserState());
                    PersistStorage.setItem(
                        PersistStorageKeys.TOKEN,
                        ''
                    ).catch();
                }
            }
        );
    };

    return (
        <View
            style={[
                ProfileModalScreenStyle.container,
                {
                    marginTop: top
                }
            ]}
        >
            <TouchableOpacity
                onPress={() => setShowAccount(!showAccount)}
                style={ProfileModalScreenStyle.accountButtonView}
            >
                <Text style={ProfileModalScreenStyle.accountButtonText}>
                    {showAccount ? 'History' : 'Account'}
                </Text>
            </TouchableOpacity>
            <ProfilePhoto name={name} size={80} />
            <Text style={ProfileModalScreenStyle.nameText}>{name}</Text>
            {showAccount ? (
                <View
                    style={[
                        ProfileModalScreenStyle.accountView,
                        { paddingBottom: bottom + 40 }
                    ]}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            Alert.alert(
                                'Are you sure you want to delete account?',
                                '',
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: deleteAccount,
                                        style: 'destructive'
                                    }
                                ]
                            );
                        }}
                    >
                        <Text style={ProfileModalScreenStyle.deleteAccountText}>
                            Delete account
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={ProfileModalScreenStyle.historyView}>
                    <Text style={ProfileModalScreenStyle.historyTitleText}>
                        History
                    </Text>
                    <FlashList
                        data={history}
                        renderItem={renderItem}
                        estimatedItemSize={80}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={onEndReached}
                        contentContainerStyle={
                            ProfileModalScreenStyle.historyListContainer
                        }
                        ListEmptyComponent={
                            <Text style={ProfileModalScreenStyle.listemptyText}>
                                No data tracked yet
                            </Text>
                        }
                    />
                </View>
            )}
        </View>
    );
};
