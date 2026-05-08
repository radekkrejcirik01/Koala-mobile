import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { ReactionBarStyle } from '@components/chat/ReactionBar/ReactionBar.style.ts';

const REACTIONS: string[] = ['👍', '❤️', '😂', '😮', '😢', '👏'];

export interface ReactionState {
  visible: boolean;
  x: number;
  y: number;
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
            top: reactionState.y - 60,
            left: reactionState.x - 140
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
