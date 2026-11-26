import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { PHOTO_SIZE } from '@components/chat/MessageItem/MessageItem.style';
import {
  DOT_SIZE,
  useTypingIndicatorStyle
} from '@components/chat/TypingIndicator/TypingIndicator.style';
import { TypingIndicatorProps } from '@components/chat/TypingIndicator/TypingIndicator.props';

const BOUNCE_DURATION = 300;
// Between one dot starting and the next
const DOT_DELAY = 150;
const BOUNCE_PAUSE = 400;

const Dot = ({ index }: { index: number }): React.JSX.Element => {
  const TypingIndicatorStyle = useTypingIndicatorStyle();
  const offset = useSharedValue(0);

  useEffect(() => {
    // Each dot lifts in turn, the same cycle length keeps the wave together
    offset.value = withDelay(
      index * DOT_DELAY,
      withRepeat(
        withSequence(
          withTiming(-DOT_SIZE / 2, { duration: BOUNCE_DURATION }),
          withTiming(0, { duration: BOUNCE_DURATION }),
          // Rests at 0 until the next wave
          withTiming(0, { duration: BOUNCE_PAUSE })
        ),
        -1
      )
    );
  }, [index, offset]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: 0.6 - offset.value / DOT_SIZE
  }));

  return <Animated.View style={[TypingIndicatorStyle.dot, style]} />;
};

// The friend's pending message while they type, under the last message
export const TypingIndicator = ({
  name,
  profilePhoto
}: TypingIndicatorProps): React.JSX.Element => {
  const TypingIndicatorStyle = useTypingIndicatorStyle();

  return (
    <View style={TypingIndicatorStyle.container}>
      <View style={TypingIndicatorStyle.photoView}>
        <ProfilePhoto name={name} photo={profilePhoto} size={PHOTO_SIZE} />
      </View>
      <View style={TypingIndicatorStyle.bubble}>
        <Dot index={0} />
        <Dot index={1} />
        <Dot index={2} />
      </View>
    </View>
  );
};
