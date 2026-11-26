import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TextLayoutLine,
  View,
  ViewStyle
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import moment from 'moment';
import {
  EmotionMessageItemProps,
  EmotionPillLayout
} from '@components/chat/EmotionMessageItem/EmotionMessageItem.props';
import { useEmotionMessageItemStyle } from '@components/chat/EmotionMessageItem/EmotionMessageItem.style';
import { EmotionPill } from '@components/chat/EmotionPill/EmotionPill';
import { getEmotionText } from '@functions/getEmotionText';
import { getLocalTime } from '@functions/getLocalTime';
import {
  useMessageItemStyle,
  TIME_WIDTH
} from '@components/chat/MessageItem/MessageItem.style';

// The pulse of the white pill waiting for support
const PULSE_SCALE = 1.04;
const PULSE_PAUSE = 2500;
const PULSE_FIRST_DELAY = 400;
// The finger hint taps toward the pill, then waits before tapping again
const TAP_HINT_DELAY = 600;
const TAP_HINT_PAUSE = 900;

export const EmotionMessageItem = ({
  id,
  emotion,
  message,
  outbound,
  time,
  offset,
  name,
  supported,
  lifted,
  showTapHint,
  backgroundColor,
  onPressEmotion,
  onLongPress
}: EmotionMessageItemProps): React.JSX.Element => {
  const EmotionMessageItemStyle = useEmotionMessageItemStyle();
  const MessageItemStyle = useMessageItemStyle();
  const pillRef = useRef<View>(null);

  // The friend's emotion still waiting for your support is white, sending it
  // fades the white away to the beige pill
  const supportable = !!onPressEmotion;
  const white = useSharedValue<number>(supportable ? 1 : 0);
  const shownId = useRef<number>(id);
  const wasSupported = useRef<boolean>(supported);

  // Support was just sent to this emotion, not loaded with the chat or shown
  // in a recycled row
  const justSupported =
    supported && !wasSupported.current && shownId.current === id;

  // Before paint, so a recycled row never flashes the previous emotion's state
  useLayoutEffect(() => {
    const value = supportable ? 1 : 0;
    wasSupported.current = supported;

    // Another emotion in a recycled row, nothing changed for this one
    if (shownId.current !== id) {
      shownId.current = id;
      white.value = value;
      return;
    }

    white.value = withTiming(value, { duration: 400 });
  }, [id, supportable, supported, white]);

  const whiteStyle = useAnimatedStyle(() => ({
    opacity: white.value
  }));
  // The white pill has no ring, the beige one under it would show around it
  const beigeStyle = useAnimatedStyle(() => ({
    opacity: 1 - white.value
  }));

  // Pressing the white pill shrinks it a little, like a button
  const pressScale = useSharedValue<number>(1);

  // While it waits for support, the white pill gently grows and settles back
  // every few seconds
  const pulse = useSharedValue<number>(1);
  useEffect(() => {
    if (!supportable || lifted) {
      cancelAnimation(pulse);
      pulse.value = withTiming(1, { duration: 200 });
      return undefined;
    }

    const easing = Easing.inOut(Easing.quad);
    const grow = () => withTiming(PULSE_SCALE, { duration: 450, easing });
    const settle = () => withTiming(1, { duration: 450, easing });

    // The first pulse comes right after the chat opens, then every few seconds
    pulse.value = withSequence(
      withDelay(PULSE_FIRST_DELAY, grow()),
      settle(),
      withRepeat(withSequence(withDelay(PULSE_PAUSE, grow()), settle()), -1)
    );
    return () => cancelAnimation(pulse);
  }, [id, lifted, pulse, supportable]);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value * pulse.value }]
  }));
  const onPressIn = useCallback(() => {
    pressScale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  }, [pressScale]);
  const onPressOut = useCallback(() => {
    pressScale.value = withSpring(1, { damping: 12, stiffness: 300 });
  }, [pressScale]);

  const tapHint = useSharedValue<number>(0);
  useEffect(() => {
    if (!showTapHint || lifted) {
      cancelAnimation(tapHint);
      tapHint.value = 0;
      return undefined;
    }

    const easing = Easing.inOut(Easing.quad);
    tapHint.value = withDelay(
      TAP_HINT_DELAY,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 250, easing }),
          withTiming(0, { duration: 250, easing }),
          withTiming(0, { duration: TAP_HINT_PAUSE })
        ),
        -1
      )
    );
    return () => cancelAnimation(tapHint);
  }, [lifted, showTapHint, tapHint]);

  // Moves up onto the pill and presses in a little, like a tap
  const tapHintStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [
        { translateX: -4 * tapHint.value },
        { translateY: -6 * tapHint.value },
        { scale: 1 - 0.12 * tapHint.value }
      ]
    })
  );

  // The lines the pill's text wrapped into, the lifted copy keeps them as
  // they are instead of wrapping the text again
  const textLines = useRef<string[]>([]);
  const pillText = getEmotionText(message, outbound, name);
  // Wrapped text keeps the whole available width, leaving room right of its
  // longest line, so it's narrowed to that line. Kept with its text, a
  // recycled row with another emotion lays it out again first
  const [fittedText, setFittedText] = useState<{
    text: string;
    width: number;
  } | null>(null);

  // Android can report the lines of an earlier, narrower measure, so they
  // only count when they don't fit on one line at the width the text got
  const layoutLines = useRef<{
    text: string;
    lines: TextLayoutLine[];
  } | null>(null);
  const naturalWidth = useRef<{ text: string; width: number } | null>(null);
  const fitText = useCallback(() => {
    const lines = layoutLines.current;
    const natural = naturalWidth.current;
    if (lines?.text !== pillText || natural?.text !== pillText) {
      return;
    }

    const total = lines.lines.reduce((sum, line) => sum + line.width, 0);
    const wraps = lines.lines.length > 1 && total > natural.width + 1;
    textLines.current = wraps
      ? lines.lines.map((line) => line.text.trimEnd())
      : [];
    if (!wraps) {
      return;
    }

    const width = Math.ceil(Math.max(...lines.lines.map((line) => line.width)));
    setFittedText((prevState) =>
      prevState?.text === pillText && prevState.width === width
        ? prevState
        : { text: pillText, width }
    );
  }, [pillText]);

  const onTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      layoutLines.current = { text: pillText, lines: event.nativeEvent.lines };
      fitText();
    },
    [fitText, pillText]
  );
  const textWidth =
    fittedText?.text === pillText ? fittedText.width : undefined;

  // The width the text gets before it's narrowed
  const onTextSize = useCallback(
    (event: LayoutChangeEvent) => {
      if (textWidth !== undefined) {
        return;
      }
      naturalWidth.current = {
        text: pillText,
        width: event.nativeEvent.layout.width
      };
      fitText();
    },
    [fitText, pillText, textWidth]
  );

  const measurePill = useCallback(
    (callback?: (layout: EmotionPillLayout) => void) => {
      const text = textLines.current.length
        ? textLines.current.join('\n')
        : undefined;
      // Page coordinates, on Android the window ones leave out the status bar
      // that the overlay covers
      pillRef.current?.measure((_x, _y, width, height, pageX, pageY) =>
        callback?.({ x: pageX, y: pageY, width, height, text })
      );
    },
    []
  );
  const onPressPill = useCallback(
    () => measurePill(onPressEmotion),
    [measurePill, onPressEmotion]
  );
  const onLongPressPill = useCallback(
    () => measurePill(onLongPress),
    [measurePill, onLongPress]
  );

  const localTime = useMemo(
    () => moment(getLocalTime(time)).format('HH:mm'),
    [time]
  );

  // The centered pill moves half of the swipe, enough to make room for the
  // time without leaving the screen
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value / 2 }]
  }));

  // The time slides in from the right edge, like on messages
  const timeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [-TIME_WIDTH, 0], [1, 0]),
    transform: [{ translateX: TIME_WIDTH + offset.value }]
  }));

  return (
    <View style={EmotionMessageItemStyle.row}>
      <Animated.View style={[EmotionMessageItemStyle.container, contentStyle]}>
        <View style={EmotionMessageItemStyle.content}>
          <Pressable
            ref={pillRef}
            disabled={!onPressEmotion && !onLongPress}
            onPress={onPressEmotion ? onPressPill : undefined}
            onLongPress={onLongPress ? onLongPressPill : undefined}
            delayLongPress={300}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={lifted && EmotionMessageItemStyle.lifted}
          >
            {/* Scaled inside, so the measured pill keeps its real size */}
            <Animated.View style={pressStyle}>
              <Animated.View style={beigeStyle}>
                <EmotionPill
                  emotion={emotion}
                  text={pillText}
                  ringColor={backgroundColor}
                  textWidth={textWidth}
                  onTextSize={onTextSize}
                />
              </Animated.View>
              <Animated.View
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, whiteStyle]}
              >
                <EmotionPill
                  white
                  emotion={emotion}
                  text={pillText}
                  textWidth={textWidth}
                  onTextLayout={onTextLayout}
                />
              </Animated.View>
            </Animated.View>
            {showTapHint && !lifted && (
              <Animated.Text
                pointerEvents="none"
                style={[EmotionMessageItemStyle.tapHint, tapHintStyle]}
              >
                👆
              </Animated.Text>
            )}
          </Pressable>
          {supported && (
            <Animated.Text
              entering={justSupported ? FadeIn.duration(400) : undefined}
              style={EmotionMessageItemStyle.supportedText}
            >
              {outbound ? `${name} sent support` : 'You sent your support'} 🫶
            </Animated.Text>
          )}
        </View>
      </Animated.View>
      <Animated.View
        style={[EmotionMessageItemStyle.timeView, timeStyle]}
        pointerEvents="none"
      >
        <Text style={MessageItemStyle.timeText}>{localTime}</Text>
      </Animated.View>
    </View>
  );
};
