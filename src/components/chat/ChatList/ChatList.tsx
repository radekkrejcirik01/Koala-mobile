import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { ReducerProps } from '@store/index/index.props';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';
import { MessageItem } from '@components/chat/MessageItem/MessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { MessageInterface } from '@interfaces/general.interface';
import { MessageMenu } from '@components/chat/MessageMenu/MessageMenu';
import {
  MessageMenuAction,
  MessageMenuTarget
} from '@components/chat/MessageMenu/MessageMenu.props';
import { MessageType } from '@enums/MessageType';
import { EmotionMessageItem } from '@components/chat/EmotionMessageItem/EmotionMessageItem';
import { SupportOverlay } from '@components/chat/SupportOverlay/SupportOverlay';
import { SupportTarget } from '@components/chat/SupportOverlay/SupportOverlay.props';
import { TypingIndicator } from '@components/chat/TypingIndicator/TypingIndicator';
import { getEmotionText } from '@functions/getEmotionText';
import {
  PHOTO_GAP,
  PHOTO_SIZE,
  TIME_WIDTH
} from '@components/chat/MessageItem/MessageItem.style';
import { EmotionPill } from '@components/chat/EmotionPill/EmotionPill';
import { EmotionPillLayout } from '@components/chat/EmotionMessageItem/EmotionMessageItem.props';
import { getReplyText } from '@functions/getReplyText';
import { shouldShowChatSeparator } from '@functions/shouldShowChatSeparator';
import { getChatSeparatorTime } from '@functions/getChatSeparatorTime';
import { isTextEmoji } from '@functions/isTextEmoji';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';

export const ChatList = ({
  listRef,
  messages,
  lastReadId,
  highlightId,
  bubbleColor,
  backgroundColor,
  typing,
  onSelectReaction,
  onPressSupport,
  onDeleteMessage,
  onReply,
  onPressReply,
  onLoadOlder,
  onLoadNewer,
  name,
  profilePhoto
}: ChatListProps): React.JSX.Element => {
  const { id } = useSelector((state: ReducerProps) => state.user.user);

  // Text messages, measured to lift them into the menu
  const messageRefs = useRef(new Map<number, View>());
  const registerMessageRef = (messageId: number) => (ref: View | null) => {
    if (ref) {
      messageRefs.current.set(messageId, ref);
    } else {
      messageRefs.current.delete(messageId);
    }
  };

  // The long-pressed message lifted above the dimmed chat with its actions
  const [menuTarget, setMenuTarget] = useState<MessageMenuTarget | null>(null);

  // The friend's emotion lifted above the dimmed chat to send support
  const [supportTarget, setSupportTarget] = useState<SupportTarget | null>(
    null
  );
  // Hidden while its lifted copy is on screen, until it settled back onto it
  const [liftedId, setLiftedId] = useState<number | null>(null);
  const listExtraData = useMemo(
    () => ({ highlightId, liftedId }),
    [highlightId, liftedId]
  );

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
  // The lifted copy in the menu never shows the time
  const noOffset = useSharedValue(0);

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

  const copy = (text: string) => {
    Clipboard.setString(text);
    trigger(HapticFeedbackTypes.impactLight);
    Toast.show({ type: 'success', text1: 'Copied!' });
  };

  // Everything can be replied to and copied, the friend's emotion supported
  // and own text messages deleted
  const getActions = (value: MessageInterface): MessageMenuAction[] => {
    const outbound = isOutbound(value.senderId);
    const isEmotion = value.type === MessageType.Emotion;

    const actions: MessageMenuAction[] = [
      { label: 'Reply', icon: 'reply', onPress: () => onReply(value.id) }
    ];
    if (isEmotion && !outbound && !value.reaction) {
      actions.push({
        label: 'Send support',
        icon: 'support',
        onPress: () => onPressSupport(value.id)
      });
    }
    actions.push({
      label: 'Copy',
      icon: 'copy',
      onPress: () => copy(isEmotion ? getReplyText(value) : value.message)
    });
    if (outbound && !isEmotion) {
      actions.push({
        label: 'Delete',
        icon: 'delete',
        destructive: true,
        onPress: () => onDeleteMessage(value.id)
      });
    }
    return actions;
  };

  // Messages still being sent have no menu, they can't be quoted or deleted
  // yet. The friend's text messages also get the reactions
  const openMessageMenu = (value: MessageInterface, preview: ReactNode) => {
    const node = messageRefs.current.get(value.id);
    if (!node || value.id < 0) {
      return;
    }

    trigger(HapticFeedbackTypes.impactMedium);
    const outbound = isOutbound(value.senderId);

    // Page coordinates, the menu measures where it starts on the page
    node.measure((_x, _y, width, height, pageX, pageY) =>
      setMenuTarget({
        id: value.id,
        preview,
        x: pageX,
        y: pageY,
        width,
        height,
        align: outbound ? 'right' : 'left',
        inset: outbound ? 0 : PHOTO_SIZE + PHOTO_GAP,
        time: value.time,
        reactions: outbound
          ? undefined
          : {
              current: value.reaction,
              onSelect: (emoji) => onSelectReaction(emoji, value.id)
            },
        actions: getActions(value)
      })
    );
  };

  const openEmotionMenu = (
    value: MessageInterface,
    layout: EmotionPillLayout
  ) => {
    if (value.id < 0) {
      return;
    }

    trigger(HapticFeedbackTypes.impactMedium);
    const outbound = isOutbound(value.senderId);

    // Extra room on each side, like in the support overlay, so the copy
    // doesn't wrap its last word
    setMenuTarget({
      id: value.id,
      preview: (
        <View style={ChatListStyle.menuEmotion}>
          <EmotionPill
            white={!outbound && !value.reaction}
            emotion={value.emotion}
            text={layout.text ?? getEmotionText(value.message, outbound, name)}
            ringColor={backgroundColor}
          />
        </View>
      ),
      x: layout.x - 1,
      y: layout.y,
      width: layout.width + 2,
      height: layout.height,
      align: 'center',
      time: value.time,
      actions: getActions(value)
    });
  };

  // Text messages of the same sender in a row read as one group, a big emoji
  // has no bubble and breaks it
  const isGrouped = (
    message: MessageInterface,
    other?: MessageInterface
  ): boolean =>
    !!other &&
    message.type === MessageType.Message &&
    other.type === MessageType.Message &&
    message.senderId === other.senderId &&
    !isTextEmoji(message.message) &&
    !isTextEmoji(other.message);

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
      <Text style={ChatListStyle.separatorText}>
        {getChatSeparatorTime(value.time)}
      </Text>
    );

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
        <View>
          {markerAbove}
          {separator}
          <View
            style={[
              ChatListStyle.emotionView,
              // The list is inverted, the item under it is the previous one.
              // A time under it, an emotion always has one, brings its own room
              !!messages[index - 1] &&
                (messages[index - 1].type === MessageType.Emotion ||
                  shouldShowChatSeparator(
                    messages[index - 1].time,
                    value.time
                  )) &&
                ChatListStyle.emotionViewBeforeTime,
              isLast && ChatListStyle.lastEmotionView
            ]}
          >
            {/* Inside the padding, only the emotion itself is highlighted */}
            <View style={highlightId === value.id && ChatListStyle.highlight}>
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
                backgroundColor={backgroundColor}
                onLongPress={
                  value.id > 0
                    ? (layout) => openEmotionMenu(value, layout)
                    : undefined
                }
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
          </View>
          {markerBelow}
        </View>
      );
    }

    // The list is inverted, the message above is the next item. A time or the
    // last read marker between them splits the group
    const above = messages[index + 1];
    const below = messages[index - 1];
    // A reply's quote sits above its bubble and splits the group too
    const joinedAbove =
      isGrouped(value, above) && !separator && !markerAbove && !value.replyTo;
    const timeBelow =
      !!below && shouldShowChatSeparator(below.time, value.time);
    const joinedBelow =
      isGrouped(value, below) && !timeBelow && !markerBelow && !below?.replyTo;

    const { replyTo } = value;

    // Room when the sender changes. An emotion or a time under it has its own
    // room, the typing indicator below the last message is the friend's
    const showSpace = below
      ? below.type === MessageType.Message &&
        below.senderId !== value.senderId &&
        !timeBelow
      : typing && isOutbound(value.senderId);

    // The same in the chat and lifted into the menu
    const renderMessage = (lifted: boolean): React.JSX.Element => (
      <MessageItem
        outbound={isOutbound(value.senderId)}
        time={value.time}
        offset={lifted ? noOffset : timeOffset}
        // Measured from the bubble, the room around it would push the actions
        // away from it
        contentRef={lifted ? undefined : registerMessageRef(value.id)}
        showSpace={showSpace}
        isLast={isLast}
        joinedAbove={joinedAbove}
        joinedBelow={joinedBelow}
        onLongPress={() => openMessageMenu(value, renderMessage(true))}
        reaction={value?.reaction}
        name={name}
        profilePhoto={profilePhoto}
        bubbleColor={bubbleColor}
        replyTo={replyTo}
        replyName={replyTo?.senderId === id ? 'You' : name}
        onPressReply={replyTo ? () => onPressReply(replyTo.id) : undefined}
        // The list is inverted, the next message is the previous item
        showPhoto={
          messages[index - 1]?.senderId !== value.senderId ||
          messages[index - 1]?.type !== MessageType.Message
        }
      >
        {value.message}
      </MessageItem>
    );

    return (
      <>
        {markerAbove}
        {separator}
        <View
          style={[
            highlightId === value.id && ChatListStyle.highlight,
            liftedId === value.id && ChatListStyle.lifted
          ]}
        >
          {renderMessage(false)}
        </View>
        {markerBelow}
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
            extraData={listExtraData}
            keyExtractor={(item) => item.id.toString()}
            // The list is inverted, its end is the oldest message
            onEndReached={onLoadOlder}
            // And its start the newest one
            onStartReached={onLoadNewer}
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

      <MessageMenu
        target={menuTarget}
        onClose={() => setMenuTarget(null)}
        onShown={() => setLiftedId(menuTarget?.id ?? null)}
        onHidden={() => setLiftedId(null)}
        tintColor={bubbleColor}
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
