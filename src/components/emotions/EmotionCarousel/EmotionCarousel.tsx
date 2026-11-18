import React, { JSX, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { EMOTIONS } from '@constants/EMOTIONS';
import {
  EmotionCarouselItemProps,
  EmotionCarouselProps
} from '@components/emotions/EmotionCarousel/EmotionCarousel.props';
import { EmotionCarouselStyle } from '@components/emotions/EmotionCarousel/EmotionCarousel.style';

const ITEM_SPACING = 95;

const EmotionCarouselItem = ({
  emotion,
  index,
  progress
}: EmotionCarouselItemProps): JSX.Element => {
  const animatedStyle = useAnimatedStyle((): ViewStyle => {
    // Distance from the centre, wrapped so every emotion is at most half the
    // list away and the row loops around at both ends
    const count = EMOTIONS.length;
    let offset = (((index - progress.value) % count) + count) % count;
    if (offset > count / 2) {
      offset -= count;
    }
    const distance = Math.abs(offset);

    return {
      // Emotions two steps away are hidden, so the wrap jump is never seen
      opacity: interpolate(
        distance,
        [0, 1, 2],
        [1, 0.35, 0],
        Extrapolation.CLAMP
      ),
      zIndex: distance < 0.5 ? 1 : 0,
      transform: [
        { translateX: offset * ITEM_SPACING },
        { scale: interpolate(distance, [0, 1], [1, 0.5], Extrapolation.CLAMP) }
      ]
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[EmotionCarouselStyle.item, animatedStyle]}
    >
      <Animated.Text style={EmotionCarouselStyle.emoji}>
        {emotion.type}
      </Animated.Text>
    </Animated.View>
  );
};

export const EmotionCarousel = ({
  position
}: EmotionCarouselProps): JSX.Element => {
  const progress = useSharedValue<number>(position);

  useEffect(() => {
    progress.value = withSpring(position, { damping: 18, stiffness: 180 });
  }, [position, progress]);

  return (
    <View style={EmotionCarouselStyle.container}>
      {EMOTIONS.map((emotion, index) => (
        <EmotionCarouselItem
          key={emotion.type}
          emotion={emotion}
          index={index}
          progress={progress}
        />
      ))}
    </View>
  );
};
