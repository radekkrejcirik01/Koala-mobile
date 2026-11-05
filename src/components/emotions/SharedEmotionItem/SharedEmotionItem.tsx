import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { useTheme } from '@hooks/useTheme';
import { SharedEmotionItemProps } from '@components/emotions/SharedEmotionItem/SharedEmotionItem.props';
import { SharedEmotionItemStyle } from '@components/emotions/SharedEmotionItem/SharedEmotionItem.style';

export const SharedEmotionItem = ({
  item
}: SharedEmotionItemProps): JSX.Element => {
  const { colors } = useTheme().theme;

  return (
    <View style={SharedEmotionItemStyle.container}>
      <View style={SharedEmotionItemStyle.emojiView}>
        <Text style={SharedEmotionItemStyle.emojiText}>
          {item.emotion || '•'}
        </Text>
      </View>
      <View style={SharedEmotionItemStyle.textView}>
        <Text
          numberOfLines={2}
          style={[SharedEmotionItemStyle.messageText, { color: colors.text }]}
        >
          {item.message || 'No message'}
        </Text>
        <Text style={SharedEmotionItemStyle.timeText}>
          {moment.unix(item.time).format('ddd D. M. YYYY · HH:mm')}
        </Text>
      </View>
    </View>
  );
};
