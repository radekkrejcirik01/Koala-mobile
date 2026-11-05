import React, { JSX, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { useSharedEmotions } from '@hooks/useSharedEmotions';
import { SharedEmotionInterface } from '@interfaces/general.interface';
import { SharedEmotionsPeriod } from '@enums/SharedEmotionsPeriod';
import {
  getSharedEmotionsBuckets,
  getSharedEmotionsCounts,
  getSharedEmotionsTitle
} from '@functions/getSharedEmotionsStats';
import COLORS from '@constants/COLORS';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { PeriodSelector } from '@components/emotions/PeriodSelector/PeriodSelector';
import { EmotionsChart } from '@components/emotions/EmotionsChart/EmotionsChart';
import { EmotionsBreakdown } from '@components/emotions/EmotionsBreakdown/EmotionsBreakdown';
import { SharedEmotionItem } from '@components/emotions/SharedEmotionItem/SharedEmotionItem';
import { SharedEmotionsScreenStyle } from '@screens/account/SharedEmotionsScreen/SharedEmotionsScreen.style';

const TOTAL_LABELS: Record<SharedEmotionsPeriod, string> = {
  [SharedEmotionsPeriod.Week]: 'this week',
  [SharedEmotionsPeriod.Month]: 'this month',
  [SharedEmotionsPeriod.Year]: 'this year'
};

export const SharedEmotionsScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme().theme;

  const [period, setPeriod] = useState<SharedEmotionsPeriod>(
    SharedEmotionsPeriod.Week
  );
  // 0 is the current period, -1 the previous one and so on
  const [offset, setOffset] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { data, range, loading, loadEmotions } = useSharedEmotions(
    period,
    offset
  );

  // While the next range loads, the previous one stays visible (dimmed)
  const emotions = data?.emotions ?? [];

  const buckets = useMemo(
    () =>
      data
        ? getSharedEmotionsBuckets(data.emotions, data.period, data.range.start)
        : [],
    [data]
  );
  const counts = useMemo(() => getSharedEmotionsCounts(emotions), [emotions]);

  const onPeriodChange = useCallback((value: SharedEmotionsPeriod) => {
    setPeriod(value);
    setOffset(0);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadEmotions(() => setRefreshing(false));
  }, [loadEmotions]);

  let totalLabel = '';
  if (data) {
    totalLabel = data.offset
      ? `shared in ${getSharedEmotionsTitle(data.period, data.range)}`
      : `shared ${TOTAL_LABELS[data.period]}`;
  }

  const header = (
    <>
      <PeriodSelector
        period={period}
        title={getSharedEmotionsTitle(period, range)}
        canGoNext={offset < 0}
        onPeriodChange={onPeriodChange}
        onPrevious={() => setOffset((value: number) => value - 1)}
        onNext={() => setOffset((value: number) => Math.min(value + 1, 0))}
      />
      {data ? (
        <View style={loading && SharedEmotionsScreenStyle.stale}>
          <View style={SharedEmotionsScreenStyle.card}>
            <Text
              style={[
                SharedEmotionsScreenStyle.totalText,
                { color: colors.text }
              ]}
            >
              {emotions.length}
            </Text>
            <Text style={SharedEmotionsScreenStyle.totalLabelText}>
              {emotions.length === 1 ? 'emotion' : 'emotions'} {totalLabel}
            </Text>
            <EmotionsChart buckets={buckets} />
          </View>
          <View style={SharedEmotionsScreenStyle.card}>
            <EmotionsBreakdown counts={counts} total={emotions.length} />
          </View>
          {!!emotions.length && (
            <Text style={SharedEmotionsScreenStyle.sectionTitle}>History</Text>
          )}
        </View>
      ) : (
        <ActivityIndicator
          color={COLORS.BUTTON_BLUE}
          style={SharedEmotionsScreenStyle.activityIndicator}
        />
      )}
    </>
  );

  return (
    <View style={[SharedEmotionsScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Analytics" />
      <FlatList
        data={emotions}
        extraData={loading}
        keyExtractor={(item: SharedEmotionInterface) => String(item.id)}
        renderItem={({ item }) => (
          <View style={loading && SharedEmotionsScreenStyle.stale}>
            <SharedEmotionItem item={item} />
          </View>
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={
          data && !loading ? (
            <Text style={SharedEmotionsScreenStyle.listEmptyText}>
              You haven&apos;t shared any emotions in this period yet.
            </Text>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[
          SharedEmotionsScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      />
    </View>
  );
};
