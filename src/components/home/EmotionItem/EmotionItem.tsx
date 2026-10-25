import React, { JSX, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import COLORS from '@constants/COLORS';
import { EmotionItemProps } from '@components/home/EmotionItem/EmotionItem.props';
import { EmotionItemStyle } from '@components/home/EmotionItem/EmotionItem.style';

export const EmotionItem = ({
  emotion,
  selected,
  onPress,
  style
}: EmotionItemProps): JSX.Element => {
  const onItemPress = useCallback(() => {
    trigger(HapticFeedbackTypes.impactLight);
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onItemPress}
      style={[
        EmotionItemStyle.container,
        {
          backgroundColor: selected ? COLORS.WHITE_300 : COLORS.WHITE_200
        },
        style
      ]}
    >
      <Text style={EmotionItemStyle.emoji}>{emotion.type}</Text>
    </TouchableOpacity>
  );
};
