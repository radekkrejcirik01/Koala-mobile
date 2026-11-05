import React, { JSX, useMemo } from 'react';
import { Text, View } from 'react-native';
import { EMOTIONS } from '@constants/EMOTIONS';
import COLORS from '@constants/COLORS';
import {
  OTHER_EMOTION,
  SharedEmotionsBucket
} from '@functions/getSharedEmotionsStats';
import { EmotionsChartProps } from '@components/emotions/EmotionsChart/EmotionsChart.props';
import {
  CHART_HEIGHT,
  EmotionsChartStyle
} from '@components/emotions/EmotionsChart/EmotionsChart.style';

// Stack order from the bottom, best emotion first
const SEGMENTS = [
  ...EMOTIONS.map((item) => ({ key: item.type, color: item.color })),
  { key: OTHER_EMOTION, color: COLORS.LIGHTGRAY }
];

// Count labels above bars only fit when there are few columns
const MAX_LABELLED_COLUMNS = 12;
const COUNT_LABEL_HEIGHT = 18;

export const EmotionsChart = ({ buckets }: EmotionsChartProps): JSX.Element => {
  const max = useMemo(
    () => Math.max(1, ...buckets.map((bucket) => bucket.total)),
    [buckets]
  );

  const showCounts = buckets.length <= MAX_LABELLED_COLUMNS;
  const barMaxHeight = CHART_HEIGHT - (showCounts ? COUNT_LABEL_HEIGHT : 0);

  return (
    <View style={EmotionsChartStyle.container}>
      {buckets.map((bucket: SharedEmotionsBucket) => (
        <View key={bucket.key} style={EmotionsChartStyle.column}>
          <View style={EmotionsChartStyle.barArea}>
            {showCounts && !!bucket.total && (
              <Text style={EmotionsChartStyle.countText}>{bucket.total}</Text>
            )}
            {bucket.total ? (
              <View
                style={[
                  EmotionsChartStyle.bar,
                  { height: (bucket.total / max) * barMaxHeight }
                ]}
              >
                {SEGMENTS.map(
                  (segment) =>
                    !!bucket.counts[segment.key] && (
                      <View
                        key={segment.key}
                        style={{
                          flex: bucket.counts[segment.key],
                          backgroundColor: segment.color
                        }}
                      />
                    )
                )}
              </View>
            ) : (
              <View style={EmotionsChartStyle.emptyBar} />
            )}
          </View>
          <Text numberOfLines={1} style={EmotionsChartStyle.labelText}>
            {bucket.label}
          </Text>
        </View>
      ))}
    </View>
  );
};
