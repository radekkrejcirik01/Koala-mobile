import { useRef, useState } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

export interface ReactionState {
  visible: boolean;
  x: number;
  y: number;
}

export const useReactionBar = () => {
  const [reactionState, setReactionState] = useState<ReactionState>({
    visible: false,
    x: 0,
    y: 0
  });

  const messageRefs = useRef(new Map());

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  const registerMessageRef = (id: number) => (ref: View | null) => {
    if (ref) {
      messageRefs.current.set(id, ref);
    }
  };

  const openReactions = (messageId: number) => {
    const node = messageRefs.current.get(messageId);

    if (!node) return;

    node.measureInWindow((x: number, y: number) => {
      setReactionState({
        visible: true,
        x: x + 150,
        y: y - 100
      });

      scale.value = withSpring(1, {
        damping: 14,
        stiffness: 180
      });

      opacity.value = withTiming(1, { duration: 120 });
      translateY.value = withSpring(0);
    });
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
    // Alert.alert(emoji);
    hideReactions();
  };

  return {
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
