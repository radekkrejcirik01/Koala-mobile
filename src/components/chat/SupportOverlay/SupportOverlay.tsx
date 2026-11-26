import React, {
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { EmotionPill } from '@components/chat/EmotionPill/EmotionPill';
import {
  SupportOverlayProps,
  SupportTarget
} from '@components/chat/SupportOverlay/SupportOverlay.props';
import { useSupportOverlayStyle } from '@components/chat/SupportOverlay/SupportOverlay.style';

// How far the pill rises and grows when it's lifted
const LIFT = 14;
const LIFT_SCALE = 1.08;
// Room kept between a pill near the bottom and the support button
const BUTTON_GAP = 40;
// Extra room on each side of the measured pill, its rounded width can come
// out a hair narrower and wrap the last word onto another line
const WIDTH_SLACK = 1;

// Dims the chat, lifts the tapped emotion above it and offers to send support
export const SupportOverlay = ({
  target,
  onSend,
  onClose,
  onShown,
  onHidden
}: SupportOverlayProps): JSX.Element | null => {
  const SupportOverlayStyle = useSupportOverlayStyle();
  const { bottom } = useSafeAreaInsets();

  // Kept while closing, so the pill can settle back before it's removed
  const [shown, setShown] = useState<SupportTarget | null>(null);
  const progress = useSharedValue<number>(0);

  // Support waiting for the close animation, sending it right away would
  // change the emotion under the pill while it settles back
  const sendingId = useRef<number | null>(null);
  // Latest callbacks, the close animation finishes after a few renders
  const callbacks = useRef({ onSend, onShown, onHidden });
  callbacks.current = { onSend, onShown, onHidden };

  // Where the overlay starts on the page, the pill is placed relative to it.
  // Measured once the modal is shown, Android shows it a few frames late and
  // lays it out below the status bar first, an animation started before would
  // lose its start and jump
  const rootRef = useRef<View>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const onShow = useCallback(() => {
    rootRef.current?.measure((_x, _y, _width, _height, pageX, pageY) =>
      setOrigin({ x: pageX, y: pageY })
    );
  }, []);

  const onCloseFinished = useCallback(() => {
    setShown(null);
    setOrigin(null);
    callbacks.current.onHidden();

    if (sendingId.current !== null) {
      callbacks.current.onSend(sendingId.current);
      sendingId.current = null;
    }
  }, []);

  // Top of the support button on screen, a pill that would end up behind it
  // is lifted further, above it
  const [buttonTop, setButtonTop] = useState<number>();
  const onButtonLayout = useCallback(
    (event: LayoutChangeEvent) => setButtonTop(event.nativeEvent.layout.y),
    []
  );
  const lift = useMemo(() => {
    if (!shown || buttonTop === undefined) {
      return LIFT;
    }

    // The pill grows around its centre, its bottom moves down by half of it
    const pillBottom =
      shown.y -
      (origin?.y ?? 0) +
      shown.height +
      (shown.height * (LIFT_SCALE - 1)) / 2;
    return Math.max(LIFT, pillBottom - (buttonTop - BUTTON_GAP));
  }, [buttonTop, origin, shown]);

  useEffect(() => {
    if (target) {
      setShown(target);
      return;
    }

    if (!shown) {
      return;
    }

    // Eases back onto the emotion in the chat without overshooting it
    progress.value = withTiming(
      0,
      { duration: 220, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(onCloseFinished)();
        }
      }
    );
    // Only the target opens or closes it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, target]);

  // Lifts the pill once the overlay is on screen, the emotion in the chat
  // hides at the same moment so it never blinks out before its copy shows
  useEffect(() => {
    if (!target || !origin) {
      return;
    }

    callbacks.current.onShown();
    progress.value = withSpring(1, { damping: 16, stiffness: 180 });
  }, [origin, progress, target]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value
  }));

  const pillStyle = useAnimatedStyle(
    (): ViewStyle => ({
      shadowOpacity: progress.value * 0.3,
      transform: [
        { translateY: -lift * progress.value },
        { scale: 1 + (LIFT_SCALE - 1) * progress.value }
      ]
    }),
    [lift]
  );

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 80 }]
  }));

  const send = useCallback(() => {
    if (!target) {
      return;
    }

    trigger(HapticFeedbackTypes.impactMedium);
    sendingId.current = target.id;
    onClose();
  }, [onClose, target]);

  if (!shown) {
    return null;
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="none"
      visible
      onRequestClose={onClose}
      onShow={onShow}
    >
      {/* The whole screen closes it, only the support button catches its own
          taps */}
      <Pressable
        ref={rootRef}
        collapsable={false}
        style={StyleSheet.absoluteFill}
        onPress={onClose}
      >
        <Animated.View
          pointerEvents="none"
          style={[SupportOverlayStyle.backdrop, backdropStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            SupportOverlayStyle.pill,
            {
              top: shown.y - (origin?.y ?? 0),
              left: shown.x - (origin?.x ?? 0) - WIDTH_SLACK,
              width: shown.width + WIDTH_SLACK * 2,
              height: shown.height,
              // Hidden until the overlay knows where it sits
              opacity: origin ? 1 : 0
            },
            pillStyle
          ]}
        >
          {/* As wide as the pill in the chat, which can keep some room right
              of its longest line */}
          <View style={{ minWidth: shown.width }}>
            <EmotionPill white emotion={shown.emotion} text={shown.text} />
          </View>
        </Animated.View>
        <Animated.View
          onLayout={onButtonLayout}
          pointerEvents="box-none"
          style={[
            SupportOverlayStyle.buttonView,
            { bottom: Math.max(bottom, 16) + 90 },
            buttonStyle
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={send}
            style={SupportOverlayStyle.button}
          >
            <View style={SupportOverlayStyle.buttonCircle}>
              <Text style={SupportOverlayStyle.buttonEmoji}>🫶</Text>
            </View>
            <Text style={SupportOverlayStyle.buttonText}>Send support</Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
