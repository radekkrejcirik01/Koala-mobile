import { useRef, useState } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';

import { ReactionState } from '@components/chat/ReactionBar/ReactionBar';

// Room between the bar and the message it's for
const BAR_GAP = 8;
// Taller than the bar, a message closer to the top gets the bar below it
const BAR_ROOM = 70;

export const useReactionBar = (
  onSelectReaction: (reaction: string, messageId: number) => void
) => {
  const [reactionState, setReactionState] = useState<ReactionState>({
    visible: false,
    left: 0
  });

  // The view the bar is placed in, messages are measured relative to it so
  // nothing depends on the header or how each platform counts the status bar
  const containerRef = useRef<View>(null);
  const messageRefs = useRef(new Map());
  const messageIdRef = useRef<number>(0);

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  const registerMessageRef = (id: number) => (ref: View | null) => {
    if (ref) {
      messageRefs.current.set(id, ref);
    }
  };

  const openReactions = (messageId: number) => {
    trigger(HapticFeedbackTypes.impactMedium);

    const node = messageRefs.current.get(messageId);
    messageIdRef.current = messageId;

    const container = containerRef.current;
    if (!node || !container) return;

    // Page coordinates of both, they include the flip of the inverted list
    container.measure(
      (_cx, _cy, _width, containerHeight, containerX, containerY) => {
        node.measure(
          (
            _nx: number,
            _ny: number,
            _w: number,
            height: number,
            pageX: number,
            pageY: number
          ) => {
            const x = pageX - containerX;
            const y = pageY - containerY;
            setReactionState({
              visible: true,
              left: x + 10,
              // Above the message, or below it when there's no room above
              ...(y < BAR_ROOM
                ? { top: y + height + BAR_GAP }
                : { bottom: containerHeight - y + BAR_GAP })
            });

            scale.value = withSpring(1, {
              damping: 14,
              stiffness: 180
            });

            opacity.value = withTiming(1, { duration: 100 });
            translateY.value = withSpring(0);
          }
        );
      }
    );
  };

  const hideReactions = () => {
    scale.value = withSpring(0.8);
    opacity.value = withTiming(0, { duration: 100 });
    translateY.value = withSpring(10);

    setReactionState((prev) => ({
      ...prev,
      visible: false
    }));
  };

  const selectReaction = (emoji: string) => {
    onSelectReaction(emoji, messageIdRef.current);
    hideReactions();
  };

  return {
    containerRef,
    reactionState,
    scale,
    opacity,
    translateY,
    registerMessageRef,
    openReactions,
    hideReactions,
    selectReaction
  };
};
