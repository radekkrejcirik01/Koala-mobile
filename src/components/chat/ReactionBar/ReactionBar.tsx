import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { ReactionBarStyle } from '@components/chat/ReactionBar/ReactionBar.style.ts';

const REACTIONS: string[] = ['👍', '❤️', '😂', '😮', '😢', '👏'];

export interface ReactionState {
  visible: boolean;
  left: number;
  // One of them is set, relative to the view the bar is placed in
  top?: number;
  bottom?: number;
}

interface ReactionBarProps {
  reactionState: ReactionState;
  scale: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
  translateY: Animated.SharedValue<number>;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

export const ReactionBar = ({
  reactionState,
  scale,
  opacity,
  translateY,
  onClose,
  onSelect
}: ReactionBarProps): React.JSX.Element | null => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ] as ViewStyle['transform']
    };
  });

  if (!reactionState.visible) return null;

  return (
    <>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <Animated.View
        style={[
          ReactionBarStyle.container,
          {
            top: reactionState.top,
            bottom: reactionState.bottom,
            left: reactionState.left
          },
          animatedStyle
        ]}
      >
        {REACTIONS.map((emoji) => (
          <Pressable
            key={emoji}
            onPress={() => onSelect(emoji)}
            style={ReactionBarStyle.emojiButton}
          >
            <Text style={ReactionBarStyle.emoji}>{emoji}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </>
  );
};
