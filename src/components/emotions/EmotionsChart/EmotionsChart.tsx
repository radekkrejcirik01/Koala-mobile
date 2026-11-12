import React, { JSX, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
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

export const EmotionsChart = ({
  buckets,
  selectedKey,
  onPressBucket
}: EmotionsChartProps): JSX.Element => {
  const max = useMemo(
    () => Math.max(1, ...buckets.map((bucket) => bucket.total)),
    [buckets]
  );

  const showCounts = buckets.length <= MAX_LABELLED_COLUMNS;
  const barMaxHeight = CHART_HEIGHT - (showCounts ? COUNT_LABEL_HEIGHT : 0);

  const onPress = (key: number) => {
    trigger(HapticFeedbackTypes.selection);
    onPressBucket(key);
  };

  return (
    <View style={EmotionsChartStyle.container}>
      {buckets.map((bucket: SharedEmotionsBucket) => {
        const selected = bucket.key === selectedKey;
        // While a bar is selected, the others are dimmed
        const dimmed = selectedKey !== undefined && !selected;

        return (
          <TouchableOpacity
            key={bucket.key}
            activeOpacity={0.7}
            // Empty bars have nothing to filter
            disabled={!bucket.total}
            onPress={() => onPress(bucket.key)}
            style={EmotionsChartStyle.column}
          >
            <View
              style={[
                EmotionsChartStyle.barArea,
                dimmed && EmotionsChartStyle.unselected
              ]}
            >
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
            <Text
              numberOfLines={1}
              style={[
                EmotionsChartStyle.labelText,
                selected && EmotionsChartStyle.selectedLabelText
              ]}
            >
              {bucket.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
