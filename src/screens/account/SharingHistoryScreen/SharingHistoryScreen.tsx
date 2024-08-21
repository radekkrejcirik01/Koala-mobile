import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { SharingHistoryScreenStyle } from '@screens/account/SharingHistoryScreen/SharingHistoryScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { HistoryInterface } from '@interfaces/general.interface';
import { HistoryItem } from '@components/profile/HistoryItem/HistoryItem';
import { ResponseHistoryGetInterface } from '@interfaces/response/Response.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import COLORS from '@constants/COLORS';

export const SharingHistoryScreen = (): React.JSX.Element => {
    const { top, bottom } = useSafeAreaInsets();

    const [history, setHistory] = useState<HistoryInterface[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

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

                        setLoaded(true);
                        return;
                    }

                    if (lastId && !!response?.data?.length) {
                        setHistory((value) => value.concat(response.data));
                    }

                    setLoaded(true);
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
        if (history?.length) {
            loadHistory(history[history?.length - 1]?.id);
        }
    }, [history, loadHistory]);

    return (
        <View
            style={[
                SharingHistoryScreenStyle.container,
                { paddingTop: top, marginBottom: bottom }
            ]}
        >
            <ScreenHeader title="History" />
            <FlashList
                data={history}
                renderItem={renderItem}
                estimatedItemSize={80}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                contentContainerStyle={
                    SharingHistoryScreenStyle.historyListContainer
                }
                ListEmptyComponent={
                    loaded ? (
                        <Text style={SharingHistoryScreenStyle.listEmptyText}>
                            No history yet
                        </Text>
                    ) : (
                        <ActivityIndicator
                            color={COLORS.BUTTON_BLUE}
                            style={SharingHistoryScreenStyle.activityIndicator}
                        />
                    )
                }
            />
        </View>
    );
};
