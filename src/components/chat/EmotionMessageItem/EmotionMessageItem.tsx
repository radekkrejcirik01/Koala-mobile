import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEventData,
  View
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
import { EmotionMessageItemProps } from '@components/chat/EmotionMessageItem/EmotionMessageItem.props';
import { EmotionMessageItemStyle } from '@components/chat/EmotionMessageItem/EmotionMessageItem.style';
import { EmotionPill } from '@components/chat/EmotionPill/EmotionPill';
import { getEmotionText } from '@functions/getEmotionText';
import { getLocalTime } from '@functions/getLocalTime';
import {
  MessageItemStyle,
  TIME_WIDTH
} from '@components/chat/MessageItem/MessageItem.style';

// The pulse of the white pill waiting for support
const PULSE_SCALE = 1.04;
const PULSE_PAUSE = 2500;
const PULSE_FIRST_DELAY = 400;

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
  onPressEmotion
}: EmotionMessageItemProps): React.JSX.Element => {
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
  const onTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      const { lines } = event.nativeEvent;
      textLines.current = lines.map((line) => line.text.trimEnd());

      if (lines.length < 2) {
        return;
      }
      const width = Math.ceil(Math.max(...lines.map((line) => line.width)));
      setFittedText((prevState) =>
        prevState?.text === pillText && prevState.width === width
          ? prevState
          : { text: pillText, width }
      );
    },
    [pillText]
  );
  const textWidth =
    fittedText?.text === pillText ? fittedText.width : undefined;

  const onPressPill = useCallback(() => {
    const text = textLines.current.length
      ? textLines.current.join('\n')
      : undefined;
    pillRef.current?.measureInWindow((x, y, width, height) =>
      onPressEmotion?.({ x, y, width, height, text })
    );
  }, [onPressEmotion]);

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
            disabled={!onPressEmotion}
            onPress={onPressPill}
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
                  textWidth={textWidth}
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
