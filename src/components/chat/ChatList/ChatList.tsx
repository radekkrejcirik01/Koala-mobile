import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useReactionBar } from '@hooks/useReactionBar';
import { ReducerProps } from '@store/index/index.props';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';
import { MessageItem } from '@components/chat/MessageItem/MessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { ConversationInterface } from '@interfaces/general.interface';
import { ReactionBar } from '@components/chat/ReactionBar/ReactionBar';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { TIME_WIDTH } from '@components/chat/MessageItem/MessageItem.style';
import { shouldShowChatSeparator } from '@functions/shouldShowChatSeparator';
import { getChatSeparatorTime } from '@functions/getChatSeparatorTime';

export const ChatList = ({
  listRef,
  conversation,
  onSelectReaction,
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
  }: ListRenderItemInfo<ConversationInterface>) => {
    // The list is inverted, the previous message is the next item
    const separator = shouldShowChatSeparator(
      value.time,
      conversation[index + 1]?.time
    ) && (
      <Text style={ChatListStyle.separatorText}>
        {getChatSeparatorTime(value.time)}
      </Text>
    );

    if (value.type === NotificationItemEnum.SupportNotificationType) {
      return (
        <>
          {separator}
          <Text style={ChatListStyle.supportText}>
            {isOutbound(value.senderId)
              ? 'You sent your support 🫶'
              : `${name} sent support 🫶`}
          </Text>
        </>
      );
    }

    return (
      <>
        {separator}
        <View ref={registerMessageRef(value.id)} collapsable={false}>
          <MessageItem
            key={value.id}
            outbound={isOutbound(value.senderId)}
            time={value.time}
            offset={timeOffset}
            replyMessage={value?.replyMessage}
            audioMessage={value?.audioMessage}
            showSpace={
              isOutbound(value.senderId)
                ? conversation[index - 1]?.senderId !== id
                : conversation[index - 1]?.senderId === id
            }
            isLast={conversation[0]?.id === value.id}
            onLongPress={
              isOutbound(value.senderId)
                ? () => {}
                : () => openReactions(value.id)
            }
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
            data={conversation}
            estimatedItemSize={100}
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
