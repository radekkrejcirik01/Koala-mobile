import React, { JSX, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useTheme } from '@hooks/useTheme';
import { EmotionItemProps } from '@components/home/EmotionItem/EmotionItem.props';
import { useEmotionItemStyle } from '@components/home/EmotionItem/EmotionItem.style';

export const EmotionItem = ({
  emotion,
  selected,
  onPress,
  style
}: EmotionItemProps): JSX.Element => {
  const EmotionItemStyle = useEmotionItemStyle();
  const { colors } = useTheme().theme;

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
          backgroundColor: selected ? colors.surface_300 : colors.surface_200
        },
        style
      ]}
    >
      <Text style={EmotionItemStyle.emoji}>{emotion.type}</Text>
    </TouchableOpacity>
  );
};
