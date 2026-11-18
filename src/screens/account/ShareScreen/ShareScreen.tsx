import React, { JSX, useCallback, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LayoutAnimationConfig,
  useAnimatedStyle
} from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { EMOTIONS } from '@constants/EMOTIONS';
import COLORS from '@constants/COLORS';
import { EmotionCarousel } from '@components/emotions/EmotionCarousel/EmotionCarousel';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ShareScreenStyle } from '@screens/account/ShareScreen/ShareScreen.style';

const MESSAGE_MAX_LENGTH = 128;

export const ShareScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { navigateTo } = useNavigation();

  // Dims the arrows together with the keyboard while the message is typed,
  // progress goes from 0 (closed) to 1 (open)
  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation();
  const arrowsStyle = useAnimatedStyle(() => ({
    opacity: 1 - keyboardProgress.value * 0.7
  }));

  // Unbounded so the carousel keeps rolling the same way when it wraps around
  const [position, setPosition] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [editingMessage, setEditingMessage] = useState<boolean>(false);

  const selectedConfig =
    EMOTIONS[
      ((position % EMOTIONS.length) + EMOTIONS.length) % EMOTIONS.length
    ];
  const trimmedMessage = message.trim();

  // Moves through the emotions, wrapping around at both ends
  const onEmotionChange = useCallback((step: number) => {
    trigger(HapticFeedbackTypes.impactLight);
    setPosition((current) => current + step);
  }, []);

  const onNext = useCallback(() => {
    navigateTo(AccountStackNavigatorEnum.ShareSendScreen, {
      emotion: selectedConfig.type,
      message: trimmedMessage || undefined
    });
  }, [navigateTo, selectedConfig.type, trimmedMessage]);

  return (
    <View
      style={[
        ShareScreenStyle.container,
        {
          backgroundColor: theme.theme.colors.background,
          // The modal is a sheet on iOS but full screen on Android
          paddingTop: Platform.OS === 'android' ? Math.max(top - 6, 0) : 10,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <ScreenHeader title="Share" />
      {/* Tapping anywhere outside the message closes the keyboard */}
      <Pressable
        accessible={false}
        onPress={Keyboard.dismiss}
        style={ShareScreenStyle.mainView}
      >
        <View style={ShareScreenStyle.titleView}>
          <EmotionCarousel position={position} />
          {editingMessage ? (
            <TextInput
              autoFocus
              multiline
              submitBehavior="blurAndSubmit"
              returnKeyType="done"
              maxLength={MESSAGE_MAX_LENGTH}
              placeholder={selectedConfig.message}
              placeholderTextColor={COLORS.LIGHTGRAY_100}
              value={message}
              onChangeText={setMessage}
              onBlur={() => setEditingMessage(false)}
              selectionColor={COLORS.BUTTON_BLUE}
              style={[
                ShareScreenStyle.title,
                ShareScreenStyle.messageInput,
                { color: theme.theme.colors.text }
              ]}
            />
          ) : (
            // Pressing the text opens the message for editing, like Add message
            // Skips the fade when the label swaps with the message input
            <LayoutAnimationConfig skipEntering skipExiting>
              <Pressable hitSlop={15} onPress={() => setEditingMessage(true)}>
                <Animated.Text
                  key={selectedConfig.type}
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(120)}
                  style={[
                    ShareScreenStyle.title,
                    { color: theme.theme.colors.text }
                  ]}
                >
                  {trimmedMessage || selectedConfig.message}
                </Animated.Text>
              </Pressable>
            </LayoutAnimationConfig>
          )}
        </View>
        <View style={ShareScreenStyle.contentView}>
          <Animated.View
            // While typing, taps on the arrows fall through and close the keyboard
            pointerEvents={editingMessage ? 'none' : 'auto'}
            style={[ShareScreenStyle.arrowsView, arrowsStyle]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={15}
              onPress={() => onEmotionChange(-1)}
              style={ShareScreenStyle.arrowButton}
            >
              <Icon
                name={IconEnum.BACK}
                size={30}
                style={ShareScreenStyle.arrowLeftIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={15}
              onPress={() => onEmotionChange(1)}
              style={ShareScreenStyle.arrowButton}
            >
              <Icon
                name={IconEnum.BACK}
                size={30}
                style={ShareScreenStyle.arrowRightIcon}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Pressable>
      <View style={ShareScreenStyle.nextButtonView}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={15}
          onPress={() => setEditingMessage(true)}
          style={ShareScreenStyle.messageButton}
        >
          <Text style={ShareScreenStyle.messageButtonText}>Add message</Text>
        </TouchableOpacity>
        <HomeButton text="Next" onPress={onNext} />
      </View>
    </View>
  );
};
