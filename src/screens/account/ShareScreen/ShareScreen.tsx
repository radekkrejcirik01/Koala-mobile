import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { useSending } from '@hooks/useSending';
import { useTheme } from '@hooks/useTheme';
import { postRequest } from '@utils/Axios/Axios.service';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import { EMOTIONS } from '@constants/EMOTIONS';
import { EmotionType } from '@enums/EmotionType';
import COLORS from '@constants/COLORS';
import { EmotionSlider } from '@components/emotions/EmotionSlider/EmotionSlider';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ShareScreenStyle } from '@screens/account/ShareScreen/ShareScreen.style';

const MESSAGE_MAX_LENGTH = 128;
const LOGGING_MIN_DURATION = 800;
const DEFAULT_POSITION = EMOTIONS.findIndex(
  (item) => item.type === EmotionType.Good
);

export const ShareScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { navigateTo, dismiss } = useNavigation();
  const { sending, sent, setSending, setSent } = useSending();

  const [position, setPosition] = useState<number>(DEFAULT_POSITION);
  // Emotion currently highlighted, which changes during a drag before the
  // position settles
  const [centerPosition, setCenterPosition] =
    useState<number>(DEFAULT_POSITION);
  const [message, setMessage] = useState<string>('');
  const [editingMessage, setEditingMessage] = useState<boolean>(false);
  const [showSwipeHint, setShowSwipeHint] = useState<boolean>(false);

  // Shows how to pick an emotion until the user swipes once or closes the
  // screen
  useEffect(() => {
    PersistStorage.getItem(PersistStorageKeys.SWIPE_HINT_SEEN)
      .then((seen) => {
        if (seen) {
          return;
        }

        setShowSwipeHint(true);
      })
      .catch();
  }, []);

  // Closing the screen with the hint shown counts as seen
  useEffect(() => {
    if (!showSwipeHint) {
      return undefined;
    }

    return () => {
      PersistStorage.setItem(PersistStorageKeys.SWIPE_HINT_SEEN, '1').catch();
    };
  }, [showSwipeHint]);

  const onSwipeStart = useCallback(() => {
    if (showSwipeHint) {
      PersistStorage.setItem(PersistStorageKeys.SWIPE_HINT_SEEN, '1').catch();
    }
  }, [showSwipeHint]);

  const selectedConfig = EMOTIONS[centerPosition];
  const trimmedMessage = message.trim();

  // Moves through the emotions, stopping at both ends
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
      <ScreenHeader title="Emotions" />
      {/* Tapping anywhere outside the message closes the keyboard */}
      <Pressable
        accessible={false}
        onPress={Keyboard.dismiss}
        style={ShareScreenStyle.mainView}
      >
        <EmotionSlider
          position={position}
          onStep={onEmotionChange}
          onCenterChange={setCenterPosition}
          style={ShareScreenStyle.titleView}
          showSwipeHint={showSwipeHint}
          onSwipeStart={onSwipeStart}
        >
          <Text style={ShareScreenStyle.selectedEmoji}>
            {selectedConfig.type}
          </Text>
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
              style={[ShareScreenStyle.title, ShareScreenStyle.messageInput]}
            />
          ) : (
            // Pressing the text opens the message for editing
            <Pressable hitSlop={15} onPress={() => setEditingMessage(true)}>
              <Text style={ShareScreenStyle.title}>
                {trimmedMessage || selectedConfig.message}
              </Text>
            </Pressable>
          )}
        </EmotionSlider>
      </Pressable>
      <View style={ShareScreenStyle.nextButtonView}>
        <HomeButton
          text={sent ? 'Done!' : sending ? 'Logging...' : 'Log only'}
          onPress={onLogOnly}
        />
        <HomeButton
          text="Next"
          onPress={onNext}
          style={ShareScreenStyle.nextButton}
        />
      </View>
    </View>
  );
};
