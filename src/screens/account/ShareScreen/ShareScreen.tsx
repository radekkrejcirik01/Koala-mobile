import React, { JSX, useCallback, useState } from 'react';
import {
  Alert,
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
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
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
const LOGGING_MIN_DURATION = 800;

export const ShareScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { navigateTo, dismiss } = useNavigation();
  const { sending, sent, setSending, setSent } = useSending();

  // Dims the arrows together with the keyboard while the message is typed,
  // progress goes from 0 (closed) to 1 (open)
  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation();
  const arrowsStyle = useAnimatedStyle(() => ({
    opacity: 1 - keyboardProgress.value * 0.7
  }));

  // Unbounded so the carousel keeps rolling the same way when it wraps around
  const [position, setPosition] = useState<number>(0);
  // Emotion currently in the centre, which changes during a drag or roll
  // before the position settles
  const [centerPosition, setCenterPosition] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [editingMessage, setEditingMessage] = useState<boolean>(false);

  const selectedConfig =
    EMOTIONS[
      ((centerPosition % EMOTIONS.length) + EMOTIONS.length) % EMOTIONS.length
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

  // Saves the emotion only to the user's own history, without sharing it
  const onLogOnly = useCallback(() => {
    if (sending || sent) {
      return;
    }

    setSending(true);
    const startedAt = Date.now();

    postRequest<ResponseInterface, EmotionMessagePostInterface>(
      'chats/emotion',
      {
        ids: [],
        message: trimmedMessage || selectedConfig.message,
        emotion: selectedConfig.type
      }
    ).subscribe((response: ResponseInterface) => {
      // Keeps Logging... and then Done! on screen for a moment each, so
      // the close doesn't feel abrupt when the request is quick
      if (response?.status === 'success') {
        const elapsed = Date.now() - startedAt;
        setTimeout(() => {
          setSending(false);
          setSent(true);
          setTimeout(dismiss, 600);
        }, Math.max(LOGGING_MIN_DURATION - elapsed, 0));
        return;
      }

      setSending(false);
      Alert.alert('Failed to log. Please try again.');
    });
  }, [
    dismiss,
    selectedConfig,
    sending,
    sent,
    setSending,
    setSent,
    trimmedMessage
  ]);

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
      <ScreenHeader title="How are you feeling?" />
      {/* Tapping anywhere outside the message closes the keyboard */}
      <Pressable
        accessible={false}
        onPress={Keyboard.dismiss}
        style={ShareScreenStyle.mainView}
      >
        <View style={ShareScreenStyle.titleView}>
          <EmotionCarousel
            position={position}
            onStep={onEmotionChange}
            onCenterChange={setCenterPosition}
          />
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
            // Pressing the text opens the message for editing
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
                size={27}
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
                size={27}
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
          onPress={onLogOnly}
          style={ShareScreenStyle.messageButton}
        >
          <Text style={ShareScreenStyle.messageButtonText}>
            {sent ? 'Done!' : sending ? 'Logging...' : 'Log only'}
          </Text>
        </TouchableOpacity>
        <HomeButton text="Next" onPress={onNext} />
      </View>
    </View>
  );
};
