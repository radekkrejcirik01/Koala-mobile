import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
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
import { TrackInterface } from '@interfaces/general.interface';
import { TrackItem } from '@components/home/TrackItem/TrackItem';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { resetUserState } from '@store/UserReducer';
import COLORS from '@constants/COLORS';

export const ProfileModalScreen = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);
    const dispatch = useDispatch();

    const { top, bottom } = useSafeAreaInsets();

    const [track, setTrack] = useState<TrackInterface[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [showAccount, setShowAccount] = useState<boolean>(false);

    const loadTrack = useCallback((lastId?: number) => {
        let endpoint = 'track';
        if (lastId) {
            endpoint += `/${lastId}`;
        }

        getRequest<ResponseHistoryGetInterface>(endpoint).subscribe(
            (response: ResponseHistoryGetInterface) => {
                if (response?.status) {
                    if (!lastId) {
                        setTrack(response.data);

                        setLoaded(true);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setTrack((value) => value.concat(response.data));
                    }

                    setLoaded(true);
                }
            }
        );
    }, []);

    useEffect(() => {
        // 300 ms modal opening time
        setTimeout(() => {
            loadTrack();
        }, 300);
    }, [loadTrack]);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<TrackInterface>): JSX.Element => (
            <TrackItem item={item} />
        ),
        []
    );

    const onEndReached = useCallback(() => {
        if (track?.length >= 20) {
            loadTrack(track[track?.length - 1].id);
        }
    }, [track, loadTrack]);

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
                    {showAccount ? 'Track' : 'Account'}
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
                    <FlashList
                        data={track}
                        renderItem={renderItem}
                        estimatedItemSize={80}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={onEndReached}
                        contentContainerStyle={
                            ProfileModalScreenStyle.historyListContainer
                        }
                        ListEmptyComponent={
                            loaded ? (
                                <Text
                                    style={
                                        ProfileModalScreenStyle.listEmptyText
                                    }
                                >
                                    No data tracked yet
                                </Text>
                            ) : (
                                <ActivityIndicator
                                    color={COLORS.BUTTON_BLUE}
                                    style={
                                        ProfileModalScreenStyle.activityIndicator
                                    }
                                />
                            )
                        }
                    />
                </View>
            )}
        </View>
    );
};
