import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useTheme } from '@hooks/useTheme';
import { SharedEmotionsPeriod } from '@enums/SharedEmotionsPeriod';
import { PeriodSelectorProps } from '@components/emotions/PeriodSelector/PeriodSelector.props';
import { PeriodSelectorStyle } from '@components/emotions/PeriodSelector/PeriodSelector.style';

const PERIODS = [
  { period: SharedEmotionsPeriod.Week, label: 'Week' },
  { period: SharedEmotionsPeriod.Month, label: 'Month' },
  { period: SharedEmotionsPeriod.Year, label: 'Year' }
];

export const PeriodSelector = ({
  period,
  title,
  canGoNext,
  onPeriodChange,
  onPrevious,
  onNext
}: PeriodSelectorProps): JSX.Element => {
  const { colors } = useTheme().theme;

  const onSegmentPress = (value: SharedEmotionsPeriod) => {
    if (value === period) {
      return;
    }
    trigger(HapticFeedbackTypes.impactLight);
    onPeriodChange(value);
  };

  return (
    <View style={PeriodSelectorStyle.container}>
      <View style={PeriodSelectorStyle.segmentedView}>
        {PERIODS.map((item) => {
          const active = item.period === period;
          return (
            <TouchableOpacity
              key={item.period}
              activeOpacity={0.7}
              onPress={() => onSegmentPress(item.period)}
              style={[
                PeriodSelectorStyle.segment,
                active && PeriodSelectorStyle.segmentActive
              ]}
            >
              <Text
                style={[
                  PeriodSelectorStyle.segmentText,
                  active && PeriodSelectorStyle.segmentTextActive
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={PeriodSelectorStyle.navigationView}>
        <TouchableOpacity activeOpacity={0.7} hitSlop={10} onPress={onPrevious}>
          <Text style={PeriodSelectorStyle.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text style={[PeriodSelectorStyle.titleText, { color: colors.text }]}>
          {title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={10}
          disabled={!canGoNext}
          onPress={onNext}
        >
          <Text
            style={[
              PeriodSelectorStyle.arrowText,
              !canGoNext && PeriodSelectorStyle.arrowTextDisabled
            ]}
          >
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
