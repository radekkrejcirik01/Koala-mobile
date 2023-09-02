import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileModalScreenStyle } from '@components/home/ProfileModalScreen/ProfileModalScreen.style';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseHistoryGetInterface } from '@interfaces/response/Response.interface';
import { HistoryInterface } from '@interfaces/general.interface';
import { HistoryItem } from '@components/home/HistoryItem/HistoryItem';

export const ProfileModalScreen = (): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { top } = useSafeAreaInsets();

    const [history, setHistory] = useState<HistoryInterface[]>([]);

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

    return (
        <View
            style={[
                ProfileModalScreenStyle.container,
                {
                    marginTop: top
                }
            ]}
        >
            <ProfilePhoto name={name} size={80} />
            <Text style={ProfileModalScreenStyle.nameText}>{name}</Text>
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
                />
            </View>
        </View>
    );
};
