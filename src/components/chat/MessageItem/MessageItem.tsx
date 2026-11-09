import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import moment from 'moment';
import { useTheme } from '@hooks/useTheme';
import { getLocalTime } from '@functions/getLocalTime';
import { isTextEmoji } from '@functions/isTextEmoji';
import { MessageItemProps } from '@components/chat/MessageItem/MessageItem.props';
import {
  MessageItemStyle,
  TIME_WIDTH
} from '@components/chat/MessageItem/MessageItem.style';

export const MessageItem = ({
  children,
  outbound,
  time,
  offset,
  onLongPress,
  showSpace,
  isLast,
  reaction
}: MessageItemProps): React.JSX.Element => {
  const { colors } = useTheme().theme;

  const align = outbound
    ? MessageItemStyle.alignEnd
    : MessageItemStyle.alignStart;

  const localTime = useMemo(
    () => moment(getLocalTime(time)).format('HH:mm'),
    [time]
  );

  // Outbound messages follow the swipe, inbound ones stay in place
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: outbound ? offset.value : 0 }]
  }));

  // The time slides in from the right edge, on outbound messages it is
  // already moved by the content
  const timeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [-TIME_WIDTH, 0], [1, 0]),
    transform: [{ translateX: TIME_WIDTH + (outbound ? 0 : offset.value) }]
  }));

  return (
    <Animated.View
      style={[isLast && MessageItemStyle.lastItemPadding, contentStyle]}
    >
      <View style={MessageItemStyle.bubbleRow}>
        <View
          style={[
            MessageItemStyle.container,
            align,
            outbound
              ? MessageItemStyle.outboundContainer
              : { backgroundColor: colors.surface }
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            delayLongPress={120}
            onLongPress={onLongPress}
          >
            <Text
              style={[
                MessageItemStyle.messageText,
                outbound
                  ? MessageItemStyle.outboundMessageText
                  : { color: colors.text },
                isTextEmoji(children) && MessageItemStyle.largeText
              ]}
            >
              {children}
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[MessageItemStyle.timeView, timeStyle]}
          pointerEvents="none"
        >
          <Text style={MessageItemStyle.timeText}>{localTime}</Text>
        </Animated.View>
      </View>
      {!!reaction && (
        <View style={[MessageItemStyle.reactionView, align]}>
          <Text style={MessageItemStyle.reactionText}>{reaction}</Text>
        </View>
      )}
      {showSpace && <View style={MessageItemStyle.spaceHeight} />}
    </Animated.View>
  );
};
