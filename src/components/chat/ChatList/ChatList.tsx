import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useReactionBar } from '@hooks/useReactionBar';
import { ReducerProps } from '@store/index/index.props';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';
import { MessageItem } from '@components/chat/MessageItem/MessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { MessageInterface } from '@interfaces/general.interface';
import { ReactionBar } from '@components/chat/ReactionBar/ReactionBar';
import { MessageType } from '@enums/MessageType';
import { EmotionMessageItem } from '@components/chat/EmotionMessageItem/EmotionMessageItem';
import { TIME_WIDTH } from '@components/chat/MessageItem/MessageItem.style';
import { shouldShowChatSeparator } from '@functions/shouldShowChatSeparator';
import { getChatSeparatorTime } from '@functions/getChatSeparatorTime';

export const ChatList = ({
  listRef,
  messages,
  onSelectReaction,
  onPressSupport,
  onDeleteMessage,
  onLoadOlder,
  name
}: ChatListProps): React.JSX.Element => {
  const { id } = useSelector((state: ReducerProps) => state.user.user);

  const {
    reactionState,
    scale,
    opacity,
    translateY,
    registerMessageRef,
    openReactions,
    hideReactions,
    selectReaction
  } = useReactionBar(onSelectReaction);

  // Swiping the chat left reveals the message times
  const timeOffset = useSharedValue(0);

  const timeGesture = useMemo(
    () =>
      Gesture.Pan()
        // Only leftward, so swiping right still goes back
        .activeOffsetX(-10)
        .failOffsetX(10)
        .failOffsetY([-10, 10])
        .onUpdate((event) => {
          timeOffset.value = Math.min(
            0,
            Math.max(-TIME_WIDTH, event.translationX)
          );
        })
        .onFinalize(() => {
          timeOffset.value = withTiming(0);
        }),
    [timeOffset]
  );

  const isOutbound = useCallback(
    (senderId: number): boolean => senderId === id,
    [id]
  );

  const renderItem = ({
    item: value,
    index
  }: ListRenderItemInfo<MessageInterface>) => {
    // The list is inverted, the previous message is the next item, an
    // emotion always shows its time
    const hasSeparator =
      value.type === MessageType.Emotion ||
      shouldShowChatSeparator(value.time, messages[index + 1]?.time);
    const separator = hasSeparator && (
      <Text
        style={[
          ChatListStyle.separatorText,
          value.type === MessageType.Emotion &&
            messages[index + 1]?.type === MessageType.Message &&
            ChatListStyle.separatorTextAfterMessage
        ]}
      >
        {getChatSeparatorTime(value.time)}
      </Text>
    );

    // Friend's messages get reactions, own ones can be deleted
    const onLongPress = isOutbound(value.senderId)
      ? () => {
          trigger(HapticFeedbackTypes.impactMedium);
          onDeleteMessage(value.id);
        }
      : () => openReactions(value.id);

    const isLast = index === 0;

    if (value.type === MessageType.Emotion) {
      return (
        <View style={isLast && ChatListStyle.lastItem}>
          {separator}
          <View
            style={[
              ChatListStyle.emotionView,
              // The list is inverted, the message under it is the previous item
              (isLast || messages[index - 1]?.type === MessageType.Message) &&
                ChatListStyle.emotionViewBeforeMessage
            ]}
          >
            <EmotionMessageItem
              emotion={value.emotion}
              message={value.message}
              outbound={isOutbound(value.senderId)}
              name={name}
              supported={!!value.reaction}
              onPressSupport={() => onPressSupport(value.id)}
            />
          </View>
        </View>
      );
    }

    return (
      <>
        {separator}
        <View ref={registerMessageRef(value.id)} collapsable={false}>
          <MessageItem
            outbound={isOutbound(value.senderId)}
            time={value.time}
            offset={timeOffset}
            showSpace={
              isOutbound(value.senderId)
                ? messages[index - 1]?.senderId !== id
                : messages[index - 1]?.senderId === id
            }
            isLast={messages[0]?.id === value.id}
            onLongPress={onLongPress}
            reaction={value?.reaction}
          >
            {value.message}
          </MessageItem>
        </View>
      </>
    );
  };

  return (
    <View style={ChatListStyle.container}>
      <GestureDetector gesture={timeGesture}>
        <View style={ChatListStyle.container}>
          <FlashList
            ref={listRef}
            inverted
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            // The list is inverted, its end is the oldest message
            onEndReached={onLoadOlder}
            // Emotions and text messages differ a lot, only reuse rows of the
            // same kind
            getItemType={(item) => item.type}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ChatListStyle.scrollViewContainer}
            renderItem={renderItem}
          />
        </View>
      </GestureDetector>

      <ReactionBar
        reactionState={reactionState}
        scale={scale}
        opacity={opacity}
        translateY={translateY}
        onClose={hideReactions}
        onSelect={selectReaction}
      />
    </View>
  );
};
