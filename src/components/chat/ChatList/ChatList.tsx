import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { SupportOverlay } from '@components/chat/SupportOverlay/SupportOverlay';
import { SupportTarget } from '@components/chat/SupportOverlay/SupportOverlay.props';
import { TypingIndicator } from '@components/chat/TypingIndicator/TypingIndicator';
import { getEmotionText } from '@functions/getEmotionText';
import { TIME_WIDTH } from '@components/chat/MessageItem/MessageItem.style';
import { shouldShowChatSeparator } from '@functions/shouldShowChatSeparator';
import { getChatSeparatorTime } from '@functions/getChatSeparatorTime';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';

export const ChatList = ({
  listRef,
  messages,
  lastReadId,
  typing,
  onSelectReaction,
  onPressSupport,
  onDeleteMessage,
  onLoadOlder,
  name,
  profilePhoto
}: ChatListProps): React.JSX.Element => {
  const { id } = useSelector((state: ReducerProps) => state.user.user);

  const {
    containerRef,
    reactionState,
    scale,
    opacity,
    translateY,
    registerMessageRef,
    openReactions,
    hideReactions,
    selectReaction
  } = useReactionBar(onSelectReaction);

  // The friend's emotion lifted above the dimmed chat to send support
  const [supportTarget, setSupportTarget] = useState<SupportTarget | null>(
    null
  );
  // Hidden while its lifted copy is on screen, until it settled back onto it
  const [liftedId, setLiftedId] = useState<number | null>(null);

  // Until support is opened for the first time, a finger taps the newest
  // emotion waiting for it
  const [showTapHint, setShowTapHint] = useState<boolean>(false);
  useEffect(() => {
    PersistStorage.getItem(PersistStorageKeys.SUPPORT_HINT_SEEN)
      .then((seen) => setShowTapHint(!seen))
      .catch();
  }, []);

  const tapHintId = useMemo(
    () =>
      showTapHint
        ? messages.find(
            (item) =>
              item.type === MessageType.Emotion &&
              item.senderId !== id &&
              !item.reaction
          )?.id
        : undefined,
    [id, messages, showTapHint]
  );

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

  // Where the Last read marker goes, only when the friend wrote after it. It's
  // under the last read message, or the nearest older one if that's deleted,
  // or above everything loaded when it's further back than the loaded pages
  const lastReadMarker = useMemo(() => {
    if (lastReadId === undefined) {
      return null;
    }

    const hasNew = messages.some(
      (item) => item.id > lastReadId && item.senderId !== id
    );
    if (!hasNew) {
      return null;
    }

    // Unsent messages have negative ids, they're newer than anything read
    const read = messages.find((item) => item.id > 0 && item.id <= lastReadId);
    return read
      ? { belowId: read.id }
      : { aboveId: messages[messages.length - 1]?.id };
  }, [id, lastReadId, messages]);

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

    // The typing indicator takes over the last message's bottom padding
    const isLast = index === 0 && !typing;

    const marker = (
      <View style={ChatListStyle.lastReadView}>
        <View style={ChatListStyle.lastReadLine} />
        <Text style={ChatListStyle.lastReadText}>Last read</Text>
        <View style={ChatListStyle.lastReadLine} />
      </View>
    );
    const markerAbove = lastReadMarker?.aboveId === value.id && marker;
    const markerBelow = lastReadMarker?.belowId === value.id && marker;

    if (value.type === MessageType.Emotion) {
      return (
        <View style={isLast && ChatListStyle.lastItem}>
          {markerAbove}
          {separator}
          <View
            style={[
              ChatListStyle.emotionView,
              // The list is inverted, the message under it is the previous item
              (index === 0 ||
                messages[index - 1]?.type === MessageType.Message) &&
                ChatListStyle.emotionViewBeforeMessage
            ]}
          >
            <EmotionMessageItem
              id={value.id}
              emotion={value.emotion}
              message={value.message}
              outbound={isOutbound(value.senderId)}
              time={value.time}
              offset={timeOffset}
              name={name}
              supported={!!value.reaction}
              lifted={liftedId === value.id}
              showTapHint={tapHintId === value.id}
              // Only the friend's emotions can be supported, and only once
              onPressEmotion={
                isOutbound(value.senderId) || value.reaction
                  ? undefined
                  : (layout) => {
                      trigger(HapticFeedbackTypes.impactLight);
                      if (showTapHint) {
                        setShowTapHint(false);
                        PersistStorage.setItem(
                          PersistStorageKeys.SUPPORT_HINT_SEEN,
                          '1'
                        ).catch();
                      }
                      setSupportTarget({
                        id: value.id,
                        emotion: value.emotion,
                        ...layout,
                        text:
                          layout.text ??
                          getEmotionText(value.message, false, name)
                      });
                    }
              }
            />
          </View>
          {markerBelow}
        </View>
      );
    }

    return (
      <>
        {markerAbove}
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
            isLast={isLast}
            onLongPress={onLongPress}
            reaction={value?.reaction}
            name={name}
            profilePhoto={profilePhoto}
            // The list is inverted, the next message is the previous item
            showPhoto={
              messages[index - 1]?.senderId !== value.senderId ||
              messages[index - 1]?.type !== MessageType.Message
            }
          >
            {value.message}
          </MessageItem>
        </View>
        {markerBelow}
      </>
    );
  };

  return (
    <View ref={containerRef} style={ChatListStyle.container}>
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
            // On by default in FlashList 2, in an inverted list it keeps the old
            // messages in place and pushes a new one below the screen
            maintainVisibleContentPosition={{ disabled: true }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ChatListStyle.scrollViewContainer}
            renderItem={renderItem}
            // The list is inverted, its header is under the last message
            ListHeaderComponent={
              typing ? (
                <TypingIndicator name={name} profilePhoto={profilePhoto} />
              ) : null
            }
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

      <SupportOverlay
        target={supportTarget}
        onSend={onPressSupport}
        onClose={() => setSupportTarget(null)}
        onShown={() => setLiftedId(supportTarget?.id ?? null)}
        onHidden={() => setLiftedId(null)}
      />
    </View>
  );
};
