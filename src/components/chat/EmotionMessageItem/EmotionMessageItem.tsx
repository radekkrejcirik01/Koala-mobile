import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { EmotionMessageItemProps } from '@components/chat/EmotionMessageItem/EmotionMessageItem.props';
import { EmotionMessageItemStyle } from '@components/chat/EmotionMessageItem/EmotionMessageItem.style';
import { SupportButton } from '@components/chat/SupportButton/SupportButton';
import { getEmotionText } from '@functions/getEmotionText';

export const EmotionMessageItem = ({
  emotion,
  message,
  outbound,
  name,
  supported,
  onPressSupport,
  onLongPress,
  reaction
}: EmotionMessageItemProps): React.JSX.Element => (
  <View style={EmotionMessageItemStyle.container}>
    <TouchableOpacity
      activeOpacity={1}
      delayLongPress={120}
      onLongPress={onLongPress}
      style={EmotionMessageItemStyle.badgeOuter}
    >
      <View style={EmotionMessageItemStyle.badge}>
        {!!emotion && (
          <Text style={EmotionMessageItemStyle.emojiText}>{emotion}</Text>
        )}
        <Text style={EmotionMessageItemStyle.messageText} numberOfLines={2}>
          {getEmotionText(message, outbound, name)}
        </Text>
      </View>
      {supported && (
        <View style={EmotionMessageItemStyle.supportedView}>
          <Text style={EmotionMessageItemStyle.supportedText}>❤️</Text>
        </View>
      )}
      {!!reaction && (
        <View style={EmotionMessageItemStyle.reactionView}>
          <Text style={EmotionMessageItemStyle.reactionText}>{reaction}</Text>
        </View>
      )}
    </TouchableOpacity>
    {/* Only the friend's emotions can be supported */}
    {!outbound && !supported && (
      <View style={EmotionMessageItemStyle.supportView}>
        <SupportButton onPress={onPressSupport} />
      </View>
    )}
  </View>
);
