import React, { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { EMOTIONS } from '@constants/EMOTIONS';
import {
  EmotionCarouselItemProps,
  EmotionCarouselProps
} from '@components/emotions/EmotionCarousel/EmotionCarousel.props';
import { EmotionCarouselStyle } from '@components/emotions/EmotionCarousel/EmotionCarousel.style';

const ITEM_SPACING = 95;
const SPRING_CONFIG = { damping: 18, stiffness: 180 };
// How far a fling carries past the release point, in seconds of its velocity
const FLING_PROJECTION = 0.15;

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
  position,
  onSwipe,
  onCenterChange
}: EmotionCarouselProps): JSX.Element => {
  const progress = useSharedValue<number>(position);
  const dragStart = useSharedValue<number>(position);

  useAnimatedReaction(
    () => Math.round(progress.value),
    (current, previous) => {
      if (previous !== null && current !== previous) {
        runOnJS(onCenterChange)(current);
      }
    },
    [onCenterChange]
  );

  // Position a swipe already springs to, so the effect doesn't restart it
  // and lose the fling velocity
  const swipedTo = useRef<number | null>(null);

  useEffect(() => {
    if (swipedTo.current === position) {
      swipedTo.current = null;
      return;
    }

    progress.value = withSpring(position, SPRING_CONFIG);
  }, [position, progress]);

  const onSwipeEnd = useCallback(
    (target: number) => {
      const step = target - position;
      if (!step) {
        return;
      }

      swipedTo.current = target;
      onSwipe(step);
    },
    [onSwipe, position]
  );

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        // Only sideways, so swiping down still closes the sheet
        .activeOffsetX([-10, 10])
        .failOffsetY([-10, 10])
        .onStart(() => {
          cancelAnimation(progress);
          dragStart.value = Math.round(progress.value);
        })
        .onUpdate((event) => {
          progress.value = dragStart.value - event.translationX / ITEM_SPACING;
        })
        .onEnd((event) => {
          const velocity = -event.velocityX / ITEM_SPACING;
          const target = Math.round(
            progress.value + velocity * FLING_PROJECTION
          );

          progress.value = withSpring(target, { ...SPRING_CONFIG, velocity });

          runOnJS(onSwipeEnd)(target);
        }),
    [dragStart, onSwipeEnd, progress]
  );

  return (
    <GestureDetector gesture={swipeGesture}>
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
    </GestureDetector>
  );
};
