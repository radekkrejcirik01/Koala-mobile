import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import COLORS from '@constants/COLORS';
import { HistoryInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseHistoryGetInterface } from '@interfaces/response/Response.interface';
import { SharedScreenProps } from '@screens/account/SharedScreen/SharedScreen.props';
import { SharedItem } from '@components/chat/SharedItem/SharedItem';
import { SharedScreenStyle } from '@screens/account/SharedScreen/SharedScreen.style';
import { SharedScreenHeader } from '@components/chat/SharedScreenHeader/SharedScreenHeader';

export const SharedScreen = ({ route }: SharedScreenProps): JSX.Element => {
  const { receiverId } = route.params;

  const { top } = useSafeAreaInsets();

  const [history, setHistory] = useState<HistoryInterface[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const loadHistory = useCallback(
    (lastId?: number) => {
      let endpoint = `user-history/${receiverId}`;
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
    },
    [receiverId]
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<HistoryInterface>): JSX.Element => (
      <SharedItem item={item} />
    ),
    []
  );

  const onEndReached = useCallback(() => {
    if (history?.length) {
      loadHistory(history[history?.length - 1]?.id);
    }
  }, [history, loadHistory]);

  return (
    <View style={[SharedScreenStyle.container, { paddingTop: top + 10 }]}>
      <SharedScreenHeader />
      <FlashList
        data={history}
        renderItem={renderItem}
        estimatedItemSize={80}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        contentContainerStyle={SharedScreenStyle.historyListContainer}
        ListEmptyComponent={
          loaded ? (
            <Text style={SharedScreenStyle.listEmptyText}>No history yet</Text>
          ) : (
            <ActivityIndicator
              color={COLORS.BUTTON_BLUE}
              style={SharedScreenStyle.activityIndicator}
            />
          )
        }
      />
    </View>
  );
};
