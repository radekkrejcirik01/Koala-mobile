import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { useTheme } from '@hooks/useTheme';
import { SharedEmotionItemProps } from '@components/emotions/SharedEmotionItem/SharedEmotionItem.props';
import { useSharedEmotionItemStyle } from '@components/emotions/SharedEmotionItem/SharedEmotionItem.style';

export const SharedEmotionItem = ({
  item,
  onPress
}: SharedEmotionItemProps): JSX.Element => {
  const SharedEmotionItemStyle = useSharedEmotionItemStyle();
  const { colors } = useTheme().theme;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={SharedEmotionItemStyle.container}
    >
      <View style={SharedEmotionItemStyle.emojiView}>
        <Text style={SharedEmotionItemStyle.emojiText}>
          {item.emotion || '•'}
        </Text>
      </View>
      <View style={SharedEmotionItemStyle.textView}>
        <Text
          numberOfLines={1}
          style={[SharedEmotionItemStyle.messageText, { color: colors.text }]}
        >
          {item.message || 'No message'}
        </Text>
        <Text style={SharedEmotionItemStyle.timeText}>
          {moment.unix(item.time).format('ddd D. M. YYYY · HH:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
