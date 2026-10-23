import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import COLORS from '@constants/COLORS';
import { EmotionItemProps } from '@components/home/EmotionItem/EmotionItem.props';
import { EmotionItemStyle } from '@components/home/EmotionItem/EmotionItem.style';

export const EmotionItem = ({
  emotion,
  selected,
  onPress,
  style
}: EmotionItemProps): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        EmotionItemStyle.container,
        { borderColor: selected ? COLORS.BUTTON_BLUE : COLORS.TRANSPARENT },
        style
      ]}
    >
      <Text style={EmotionItemStyle.emoji}>{emotion.type}</Text>
    </TouchableOpacity>
  );
};
