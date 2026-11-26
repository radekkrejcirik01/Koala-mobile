import React, { useMemo } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import moment from 'moment';
import { useTheme } from '@hooks/useTheme';
import { getLocalTime } from '@functions/getLocalTime';
import { isTextEmoji } from '@functions/isTextEmoji';
import { getReplyText } from '@functions/getReplyText';
import { MessageItemProps } from '@components/chat/MessageItem/MessageItem.props';
import {
  useMessageItemStyle,
  PHOTO_SIZE,
  TIME_WIDTH
} from '@components/chat/MessageItem/MessageItem.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

// Messages of a group sit 2pt apart, so it reaches further to the free sides
const BUBBLE_HIT_SLOP = { top: 4, bottom: 4, left: 16, right: 16 };

export const MessageItem = ({
  children,
  outbound,
  time,
  offset,
  onLongPress,
  showSpace,
  isLast,
  joinedAbove,
  joinedBelow,
  reaction,
  name,
  profilePhoto,
  showPhoto,
  bubbleColor,
  replyTo,
  replyName,
  onPressReply,
  contentRef
}: MessageItemProps): React.JSX.Element => {
  const MessageItemStyle = useMessageItemStyle();
  const { theme, isDark } = useTheme();
  const { colors } = theme;
  // Quieter on dark, where the quote can't be faded
  const quoteColor = isDark ? colors.textSecondary : colors.text;

  const isEmoji = isTextEmoji(children);

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
      {/* The bubble with its reaction, without the room around them */}
      <View ref={contentRef} collapsable={false}>
        {/* The quoted message, a faded bubble tucked under the reply */}
        {!!replyTo && (
          <Pressable
            disabled={replyTo.deleted}
            delayLongPress={120}
            onPress={onPressReply}
            onLongPress={onLongPress}
            style={[
              MessageItemStyle.quoteView,
              outbound ? align : MessageItemStyle.inboundQuoteView,
              !isEmoji && MessageItemStyle.quoteViewTucked
            ]}
          >
            {replyTo.deleted ? (
              <Text
                style={[
                  MessageItemStyle.quoteText,
                  MessageItemStyle.quoteDeletedText,
                  { color: quoteColor }
                ]}
              >
                Original message deleted
              </Text>
            ) : (
              <>
                <Text
                  numberOfLines={1}
                  style={[MessageItemStyle.quoteName, { color: quoteColor }]}
                >
                  {replyName}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[MessageItemStyle.quoteText, { color: quoteColor }]}
                >
                  {getReplyText(replyTo)}
                </Text>
              </>
            )}
          </Pressable>
        )}
        <View
          style={[
            MessageItemStyle.bubbleRow,
            !outbound && MessageItemStyle.inboundRow
          ]}
        >
          {/* Inbound bubbles keep the photo's room so they stay aligned */}
          {!outbound && (
            <View style={MessageItemStyle.photoView}>
              {showPhoto && (
                <ProfilePhoto
                  name={name}
                  photo={profilePhoto}
                  size={PHOTO_SIZE}
                />
              )}
            </View>
          )}
          {/* The whole bubble and a little around it can be long-pressed, not
            just its text */}
          <TouchableOpacity
            activeOpacity={1}
            delayLongPress={120}
            onLongPress={onLongPress}
            hitSlop={BUBBLE_HIT_SLOP}
            style={[
              MessageItemStyle.container,
              outbound && align,
              outbound
                ? MessageItemStyle.outboundContainer
                : MessageItemStyle.inboundContainer,
              outbound && !!bubbleColor && { backgroundColor: bubbleColor },
              joinedAbove &&
                (outbound
                  ? MessageItemStyle.joinedTopRight
                  : MessageItemStyle.joinedTopLeft),
              joinedBelow &&
                (outbound
                  ? MessageItemStyle.joinedBottomRight
                  : MessageItemStyle.joinedBottomLeft),
              isEmoji && MessageItemStyle.emojiContainer
            ]}
          >
            <Text
              style={[
                MessageItemStyle.messageText,
                outbound
                  ? MessageItemStyle.outboundMessageText
                  : { color: colors.text },
                isEmoji && MessageItemStyle.largeText
              ]}
            >
              {children}
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={[MessageItemStyle.timeView, timeStyle]}
            pointerEvents="none"
          >
            <Text style={MessageItemStyle.timeText}>{localTime}</Text>
          </Animated.View>
        </View>
        {!!reaction && (
          <View
            style={[
              MessageItemStyle.reactionView,
              align,
              !outbound && MessageItemStyle.inboundReactionView
            ]}
          >
            <Text style={MessageItemStyle.reactionText}>{reaction}</Text>
          </View>
        )}
      </View>
      {showSpace && <View style={MessageItemStyle.spaceHeight} />}
    </Animated.View>
  );
};
