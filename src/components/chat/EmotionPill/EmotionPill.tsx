import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { EmotionPillProps } from '@components/chat/EmotionPill/EmotionPill.props';
import { EmotionMessageItemStyle } from '@components/chat/EmotionMessageItem/EmotionMessageItem.style';

// The emotion badge of a chat emotion, also lifted above the chat when it's
// tapped to send support
export const EmotionPill = ({
  emotion,
  text,
  white,
  textWidth,
  onTextLayout,
  onTextSize
}: EmotionPillProps): JSX.Element => (
  <View
    style={[
      EmotionMessageItemStyle.badgeOuter,
      white && EmotionMessageItemStyle.badgeOuterWhite
    ]}
  >
    <View
      style={[
        EmotionMessageItemStyle.badge,
        white && EmotionMessageItemStyle.badgeWhite
      ]}
    >
      {!!emotion && (
        <Text style={EmotionMessageItemStyle.emojiText}>{emotion}</Text>
      )}
      <Text
        style={[
          EmotionMessageItemStyle.messageText,
          textWidth !== undefined && { width: textWidth }
        ]}
        onTextLayout={onTextLayout}
        onLayout={onTextSize}
      >
        {text}
      </Text>
    </View>
  </View>
);
