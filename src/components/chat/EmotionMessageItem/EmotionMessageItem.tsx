import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import moment from 'moment';
import { EmotionMessageItemProps } from '@components/chat/EmotionMessageItem/EmotionMessageItem.props';
import { EmotionMessageItemStyle } from '@components/chat/EmotionMessageItem/EmotionMessageItem.style';
import { SupportButton } from '@components/chat/SupportButton/SupportButton';
import { getEmotionText } from '@functions/getEmotionText';
import { getLocalTime } from '@functions/getLocalTime';
import {
  MessageItemStyle,
  TIME_WIDTH
} from '@components/chat/MessageItem/MessageItem.style';

export const EmotionMessageItem = ({
  emotion,
  message,
  outbound,
  time,
  offset,
  name,
  supported,
  onPressSupport
}: EmotionMessageItemProps): React.JSX.Element => {
  const localTime = useMemo(
    () => moment(getLocalTime(time)).format('HH:mm'),
    [time]
  );

  // The centered pill moves half of the swipe, enough to make room for the
  // time without leaving the screen
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value / 2 }]
  }));

  // The time slides in from the right edge, like on messages
  const timeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [-TIME_WIDTH, 0], [1, 0]),
    transform: [{ translateX: TIME_WIDTH + offset.value }]
  }));

  return (
    <View style={EmotionMessageItemStyle.row}>
      <Animated.View style={[EmotionMessageItemStyle.container, contentStyle]}>
        <View style={EmotionMessageItemStyle.content}>
          <View style={EmotionMessageItemStyle.badgeOuter}>
            <View style={EmotionMessageItemStyle.badge}>
              {!!emotion && (
                <Text style={EmotionMessageItemStyle.emojiText}>{emotion}</Text>
              )}
              <Text style={EmotionMessageItemStyle.messageText}>
                {getEmotionText(message, outbound, name)}
              </Text>
            </View>
          </View>
          {supported && (
            <Text style={EmotionMessageItemStyle.supportedText}>
              {outbound ? `${name} sent support` : 'You sent your support'} 🫶
            </Text>
          )}
        </View>
        {/* Only the friend's emotions can be supported */}
        {!outbound && !supported && (
          <View style={EmotionMessageItemStyle.supportView}>
            <SupportButton onPress={onPressSupport} />
          </View>
        )}
      </Animated.View>
      <Animated.View
        style={[EmotionMessageItemStyle.timeView, timeStyle]}
        pointerEvents="none"
      >
        <Text style={MessageItemStyle.timeText}>{localTime}</Text>
      </Animated.View>
    </View>
  );
};
