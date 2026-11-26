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
import {
  DESTRUCTIVE,
  useMessageMenuStyle
} from '@components/chat/MessageMenu/MessageMenu.style';
import { MessageMenuIcon } from '@components/chat/MessageMenu/MessageMenuIcon';
import COLORS from '@constants/COLORS';
import {
  MessageMenuProps,
  MessageMenuTarget
} from '@components/chat/MessageMenu/MessageMenu.props';
import { getChatSeparatorTime } from '@functions/getChatSeparatorTime';

const REACTIONS: string[] = ['👍', '❤️', '😂', '😮', '😢', '👏'];

// Height of the reactions row, and the room between it, the message and the
// actions
const REACTIONS_HEIGHT = 58;
const REACTIONS_WIDTH = 288;
const GAP = 8;
// Kept free at the top and bottom of the screen
const EDGE = 12;
const SIDE = 8;

// Dims the chat, lifts the long-pressed message above it with the reactions
// over it and the actions under it
export const MessageMenu = ({
  target,
  onClose,
  onShown,
  onHidden,
  tintColor = COLORS.PURPLE
}: MessageMenuProps): JSX.Element | null => {
  const MessageMenuStyle = useMessageMenuStyle();
  const insets = useSafeAreaInsets();

  // A light tint of the chat theme's color, every theme's is a #rrggbb hex
  const tints = useMemo(
    () => ({
      selected: { backgroundColor: `${tintColor}26` }
    }),
    [tintColor]
  );

  // Kept while closing, so the message can settle back before it's removed
  const [shown, setShown] = useState<MessageMenuTarget | null>(null);
  const progress = useSharedValue<number>(0);

  // The action waiting for the close animation, so the chat changes after the
  // message settled back
  const pending = useRef<(() => void) | null>(null);
  // Latest callbacks, the close animation finishes after a few renders
  const callbacks = useRef({ onShown, onHidden });
  callbacks.current = { onShown, onHidden };

  // Where the overlay starts on the page and how big it is, measured once the
  // modal is shown as Android lays it out late, like the support overlay
  const rootRef = useRef<View>(null);
  const [root, setRoot] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const onShow = useCallback(() => {
    rootRef.current?.measure((_x, _y, width, height, pageX, pageY) =>
      setRoot({ x: pageX, y: pageY, width, height })
    );
  }, []);

  const [actionsHeight, setActionsHeight] = useState<number>();
  const onActionsLayout = useCallback(
    (event: LayoutChangeEvent) =>
      setActionsHeight(event.nativeEvent.layout.height),
    []
  );

  const onCloseFinished = useCallback(() => {
    setShown(null);
    setRoot(null);
    setActionsHeight(undefined);
    callbacks.current.onHidden();

    const action = pending.current;
    pending.current = null;
    action?.();
  }, []);

  useEffect(() => {
    if (target) {
      setShown(target);
      return;
    }

    if (!shown) {
      return;
    }

    progress.value = withTiming(
      0,
      { duration: 200, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(onCloseFinished)();
        }
      }
    );
    // Only the target opens or closes it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, target]);

  // Opens once the overlay and the actions are measured, so nothing jumps
  const ready = !!root && actionsHeight !== undefined;
  useEffect(() => {
    if (!target || !ready) {
      return;
    }

    callbacks.current.onShown();
    progress.value = withSpring(1, { damping: 18, stiffness: 220 });
  }, [progress, ready, target]);

  // The message in the overlay, moved up or down so the reactions and the
  // actions fit around it on screen
  const top = shown && root ? shown.y - root.y : 0;
  const shift = useMemo(() => {
    if (!shown || !root || actionsHeight === undefined) {
      return 0;
    }

    const minTop =
      insets.top + EDGE + (shown.reactions ? REACTIONS_HEIGHT + GAP : 0);
    const maxBottom =
      root.height - Math.max(insets.bottom, EDGE) - actionsHeight - GAP;

    let value = 0;
    if (top + shown.height > maxBottom) {
      value = maxBottom - (top + shown.height);
    }
    // A message taller than the room keeps its top on screen
    if (top + value < minTop) {
      value = minTop - top;
    }
    return value;
  }, [actionsHeight, insets.bottom, insets.top, root, shown, top]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value
  }));

  const previewStyle = useAnimatedStyle(
    (): ViewStyle => ({
      shadowOpacity: progress.value * 0.3,
      transform: [{ translateY: shift * progress.value }]
    }),
    [shift]
  );

  // Grow out of the message
  const reactionsStyle = useAnimatedStyle(
    (): ViewStyle => ({
      opacity: progress.value,
      transform: [
        { translateY: (1 - progress.value) * 12 },
        { scale: 0.85 + 0.15 * progress.value }
      ]
    })
  );
  const actionsStyle = useAnimatedStyle(
    (): ViewStyle => ({
      opacity: progress.value,
      transform: [
        { translateY: (1 - progress.value) * -12 },
        { scale: 0.85 + 0.15 * progress.value }
      ]
    })
  );

  const run = useCallback(
    (action: () => void) => {
      pending.current = action;
      onClose();
    },
    [onClose]
  );

  if (!shown) {
    return null;
  }

  const left = shown.x - (root?.x ?? 0);
  // Lines the reactions and actions up with the message's side
  const rowStyle: ViewStyle =
    shown.align === 'right'
      ? {
          right: Math.max(SIDE, (root?.width ?? 0) - (left + shown.width)),
          alignItems: 'flex-end'
        }
      : shown.align === 'left'
      ? { left: left + (shown.inset ?? 0), alignItems: 'flex-start' }
      : { left: 0, right: 0, alignItems: 'center' };
  // The reactions are wider than most messages, moved left to stay on a
  // narrow screen
  const reactionsLeft: ViewStyle | false = shown.align === 'left' && {
    left: Math.max(
      SIDE,
      Math.min(
        left + (shown.inset ?? 0),
        (root?.width ?? 0) - SIDE - REACTIONS_WIDTH
      )
    )
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="none"
      visible
      onRequestClose={onClose}
      onShow={onShow}
    >
      {/* Tapping anywhere else closes it */}
      <Pressable
        ref={rootRef}
        collapsable={false}
        style={StyleSheet.absoluteFill}
        onPress={onClose}
      >
        <Animated.View
          pointerEvents="none"
          style={[MessageMenuStyle.backdrop, backdropStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            MessageMenuStyle.preview,
            {
              top,
              left,
              width: shown.width,
              // Hidden until the overlay knows where it sits
              opacity: ready ? 1 : 0
            },
            previewStyle
          ]}
        >
          {shown.preview}
        </Animated.View>

        {!!shown.reactions && (
          <Animated.View
            style={[
              MessageMenuStyle.row,
              rowStyle,
              reactionsLeft,
              { top: top + shift - GAP - REACTIONS_HEIGHT },
              reactionsStyle
            ]}
          >
            <View style={MessageMenuStyle.reactions}>
              {REACTIONS.map((emoji) => (
                <Pressable
                  key={emoji}
                  onPress={() => run(() => shown.reactions?.onSelect(emoji))}
                  style={[
                    MessageMenuStyle.reactionButton,
                    shown.reactions?.current === emoji && tints.selected
                  ]}
                >
                  <Text style={MessageMenuStyle.reaction}>{emoji}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}

        <Animated.View
          onLayout={onActionsLayout}
          style={[
            MessageMenuStyle.row,
            rowStyle,
            { top: top + shift + shown.height + GAP },
            actionsStyle
          ]}
        >
          <View style={MessageMenuStyle.actions}>
            {shown.actions.map((action) => (
              <Pressable
                key={action.label}
                onPress={() => run(action.onPress)}
                style={({ pressed }) => [
                  MessageMenuStyle.action,
                  pressed && MessageMenuStyle.actionPressed
                ]}
              >
                <View style={MessageMenuStyle.actionIcon}>
                  <MessageMenuIcon
                    name={action.icon}
                    color={action.destructive ? DESTRUCTIVE : tintColor}
                  />
                </View>
                <Text
                  style={[
                    MessageMenuStyle.actionText,
                    action.destructive && MessageMenuStyle.destructiveText
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={MessageMenuStyle.time}>
            {getChatSeparatorTime(shown.time)}
          </Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
