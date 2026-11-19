import React, { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  clamp,
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { EMOTIONS } from '@constants/EMOTIONS';
import {
  EmotionIndicatorItemProps,
  EmotionSliderProps
} from '@components/emotions/EmotionSlider/EmotionSlider.props';
import { EmotionSliderStyle } from '@components/emotions/EmotionSlider/EmotionSlider.style';

// How far a drag moves to select the next emotion
const STEP_WIDTH = 60;
const LAST_INDEX = EMOTIONS.length - 1;
const SPRING_CONFIG = { damping: 18, stiffness: 180 };
// How far a fling carries past the release point, in seconds of its velocity
const FLING_PROJECTION = 0.15;
// The swipe hint waits for the screen to finish opening, then keeps sliding
// the finger across the row, fading it in and out with a pause in between
const HINT_DELAY = 900;
const HINT_SLIDE = 40;
const HINT_SLIDE_DURATION = 900;
const HINT_FADE_DURATION = 150;
const HINT_PAUSE = 600;

// Emotion in the row, fully visible while selected, tapping selects it
const EmotionIndicatorItem = ({
  emotion,
  index,
  progress,
  onSelect
}: EmotionIndicatorItemProps): JSX.Element => {
  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        // Covers half the gap on each side, so taps between emotions count
        .hitSlop({ horizontal: 8, vertical: 15 })
        .onEnd(() => {
          runOnJS(onSelect)(index);
        }),
    [index, onSelect]
  );

  const animatedStyle = useAnimatedStyle(
    (): ViewStyle => ({
      opacity: interpolate(
        Math.abs(index - progress.value),
        [0, 1],
        [1, 0.4],
        Extrapolation.CLAMP
      )
    })
  );

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.Text style={[EmotionSliderStyle.indicatorEmoji, animatedStyle]}>
        {emotion.type}
      </Animated.Text>
    </GestureDetector>
  );
};

export const EmotionSlider = ({
  position,
  onStep,
  onCenterChange,
  style,
  children,
  showSwipeHint,
  onSwipeStart
}: EmotionSliderProps): JSX.Element => {
  const progress = useSharedValue<number>(position);
  const dragStart = useSharedValue<number>(position);
  const hintX = useSharedValue<number>(-HINT_SLIDE);
  const hintOpacity = useSharedValue<number>(0);

  useEffect(() => {
    if (!showSwipeHint) {
      return;
    }

    const easing = Easing.inOut(Easing.ease);
    hintX.value = withDelay(
      HINT_DELAY,
      withRepeat(
        withSequence(
          withTiming(-HINT_SLIDE, { duration: 0 }),
          withDelay(
            HINT_FADE_DURATION,
            withTiming(HINT_SLIDE, { duration: HINT_SLIDE_DURATION, easing })
          ),
          withDelay(
            HINT_FADE_DURATION + HINT_PAUSE,
            withTiming(HINT_SLIDE, { duration: 0 })
          )
        ),
        -1
      )
    );
    hintOpacity.value = withDelay(
      HINT_DELAY,
      withRepeat(
        withSequence(
          withTiming(1, { duration: HINT_FADE_DURATION }),
          withDelay(
            HINT_SLIDE_DURATION,
            withTiming(0, { duration: HINT_FADE_DURATION })
          ),
          withDelay(HINT_PAUSE, withTiming(0, { duration: 0 }))
        ),
        -1
      )
    );

    return () => {
      cancelAnimation(hintX);
      cancelAnimation(hintOpacity);
    };
  }, [hintOpacity, hintX, showSwipeHint]);

  const hintStyle = useAnimatedStyle(
    (): ViewStyle => ({
      opacity: hintOpacity.value,
      transform: [{ translateX: hintX.value }]
    })
  );

  useAnimatedReaction(
    // Clamped, as the spring overshoots past the first and last emotion
    () => Math.round(clamp(progress.value, 0, LAST_INDEX)),
    (current, previous) => {
      if (previous !== null && current !== previous) {
        runOnJS(onCenterChange)(current);
      }
    },
    [onCenterChange]
  );

  // Position a swipe already springs to or a tap already jumped to, so the
  // effect doesn't spring there again
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
      onStep(step);
    },
    [onStep, position]
  );

  // A tapped emotion is selected straight away, without rolling over to it
  const onSelect = useCallback(
    (index: number) => {
      if (index === position) {
        return;
      }

      cancelAnimation(hintX);
      hintOpacity.value = withTiming(0, { duration: 150 });
      cancelAnimation(progress);
      progress.value = index;
      swipedTo.current = index;
      onStep(index - position);
    },
    [hintOpacity, hintX, onStep, position, progress]
  );

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        // Only sideways, so swiping down still closes the sheet
        .activeOffsetX([-10, 10])
        .failOffsetY([-10, 10])
        .onStart(() => {
          // The hint is no longer needed once the user swipes
          cancelAnimation(hintX);
          hintOpacity.value = withTiming(0, { duration: 150 });
          if (onSwipeStart) {
            runOnJS(onSwipeStart)();
          }
          cancelAnimation(progress);
          dragStart.value = Math.round(progress.value);
        })
        // The row is reversed, so dragging right moves towards Super good
        .onUpdate((event) => {
          progress.value = clamp(
            dragStart.value - event.translationX / STEP_WIDTH,
            0,
            LAST_INDEX
          );
        })
        .onEnd((event) => {
          const velocity = -event.velocityX / STEP_WIDTH;
          const target = clamp(
            Math.round(progress.value + velocity * FLING_PROJECTION),
            0,
            LAST_INDEX
          );

          progress.value = withSpring(target, { ...SPRING_CONFIG, velocity });

          runOnJS(onSwipeEnd)(target);
        }),
    [dragStart, hintOpacity, hintX, onSwipeEnd, onSwipeStart, progress]
  );

  // The swipe covers the whole area around the row, so dragging anywhere
  // moves the selection
  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={style}>
        {children}
        <View style={EmotionSliderStyle.indicator}>
          {EMOTIONS.map((emotion, index) => (
            <EmotionIndicatorItem
              key={emotion.type}
              emotion={emotion}
              index={index}
              progress={progress}
              onSelect={onSelect}
            />
          ))}
          {showSwipeHint && (
            <Animated.Text
              pointerEvents="none"
              style={[EmotionSliderStyle.swipeHint, hintStyle]}
            >
              👆
            </Animated.Text>
          )}
        </View>
      </View>
    </GestureDetector>
  );
};
