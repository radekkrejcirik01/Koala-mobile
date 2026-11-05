import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { EMOTIONS } from '@constants/EMOTIONS';
import COLORS from '@constants/COLORS';
import { OTHER_EMOTION } from '@functions/getSharedEmotionsStats';
import { EmotionsBreakdownProps } from '@components/emotions/EmotionsBreakdown/EmotionsBreakdown.props';
import { EmotionsBreakdownStyle } from '@components/emotions/EmotionsBreakdown/EmotionsBreakdown.style';

export const EmotionsBreakdown = ({
  counts,
  total
}: EmotionsBreakdownProps): JSX.Element => {
  const { colors } = useTheme().theme;

  const rows = EMOTIONS.map((item) => ({
    key: item.type as string,
    emoji: item.type as string,
    label: item.label,
    color: item.color
  }));

  if (counts[OTHER_EMOTION]) {
    rows.push({
      key: OTHER_EMOTION,
      emoji: '•',
      label: 'Other',
      color: COLORS.LIGHTGRAY
    });
  }

  return (
    <View>
      {rows.map((row) => {
        const count = counts[row.key] ?? 0;
        return (
          <View
            key={row.key}
            style={[
              EmotionsBreakdownStyle.row,
              !count && EmotionsBreakdownStyle.zero
            ]}
          >
            <Text style={EmotionsBreakdownStyle.emojiText}>{row.emoji}</Text>
            <Text
              numberOfLines={1}
              style={[EmotionsBreakdownStyle.labelText, { color: colors.text }]}
            >
              {row.label}
            </Text>
            <View style={EmotionsBreakdownStyle.track}>
              <View
                style={[
                  EmotionsBreakdownStyle.fill,
                  {
                    width: `${total ? (count / total) * 100 : 0}%`,
                    backgroundColor: row.color
                  }
                ]}
              />
            </View>
            <Text
              style={[EmotionsBreakdownStyle.countText, { color: colors.text }]}
            >
              {count}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
