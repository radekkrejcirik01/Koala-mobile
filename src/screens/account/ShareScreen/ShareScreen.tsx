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
import {
  clearShareDrafts,
  DraftCache,
  SHARE_DRAFT,
  SHARE_EMOTION_DRAFT
} from '@utils/general/DraftCache';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import { EMOTIONS } from '@constants/EMOTIONS';
import { EmotionType } from '@enums/EmotionType';
import { EmotionSlider } from '@components/emotions/EmotionSlider/EmotionSlider';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useShareScreenStyle } from '@screens/account/ShareScreen/ShareScreen.style';

// The backend's limit for a note
const NOTE_MAX_LENGTH = 512;
const LOGGING_MIN_DURATION = 800;
const DEFAULT_POSITION = EMOTIONS.findIndex(
  (item) => item.type === EmotionType.Good
);

// The emotion picked before leaving the screen, or Good
const getStartPosition = (): number => {
  const index = EMOTIONS.findIndex(
    (item) => item.type === DraftCache.get(SHARE_EMOTION_DRAFT)
  );
  return index < 0 ? DEFAULT_POSITION : index;
};

export const ShareScreen = (): JSX.Element => {
  const ShareScreenStyle = useShareScreenStyle();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { navigateTo, dismiss } = useNavigation();
  const { sending, sent, setSending, setSent } = useSending();

  const [position, setPosition] = useState<number>(getStartPosition);
  // Emotion currently highlighted, which changes during a drag before the
  // position settles
  const [centerPosition, setCenterPosition] =
    useState<number>(getStartPosition);
  // What was written before leaving the screen, until it's saved or sent
  const [note, setNote] = useState<string>(() => DraftCache.get(SHARE_DRAFT));
  const [editingNote, setEditingNote] = useState<boolean>(false);
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

  useEffect(() => {
    DraftCache.set(SHARE_DRAFT, note);
  }, [note]);

  useEffect(() => {
    DraftCache.set(SHARE_EMOTION_DRAFT, EMOTIONS[centerPosition].type);
  }, [centerPosition]);

  const onSwipeStart = useCallback(() => {
    if (showSwipeHint) {
      PersistStorage.setItem(PersistStorageKeys.SWIPE_HINT_SEEN, '1').catch();
    }
  }, [showSwipeHint]);

  const selectedConfig = EMOTIONS[centerPosition];
  const trimmedNote = note.trim();
  // The input stays while there's a note, the button comes back when it's empty
  const showNote = editingNote || !!trimmedNote;

  // Moves through the emotions, stopping at both ends
  const onEmotionChange = useCallback((step: number) => {
    trigger(HapticFeedbackTypes.impactLight);
    setPosition((current) => current + step);
  }, []);

  const onNext = useCallback(() => {
    navigateTo(AccountStackNavigatorEnum.ShareSendScreen, {
      emotion: selectedConfig.type,
      note: trimmedNote || undefined
    });
  }, [navigateTo, selectedConfig.type, trimmedNote]);

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
        message: selectedConfig.message,
        emotion: selectedConfig.type,
        note: trimmedNote || undefined
      }
    ).subscribe((response: ResponseInterface) => {
      // Keeps Saving... and then Done! on screen for a moment each, so
      // the close doesn't feel abrupt when the request is quick
      if (response?.status === 'success') {
        const elapsed = Date.now() - startedAt;
        setTimeout(() => {
          setSending(false);
          setSent(true);
          clearShareDrafts();
          setTimeout(dismiss, 600);
        }, Math.max(LOGGING_MIN_DURATION - elapsed, 0));
        return;
      }

      setSending(false);
      Alert.alert('Failed to save. Please try again.');
    });
  }, [
    dismiss,
    selectedConfig,
    sending,
    sent,
    setSending,
    setSent,
    trimmedNote
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
      <ScreenHeader title="How are we feeling?" />
      {/* Tapping anywhere outside the note closes the keyboard */}
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
          <Text style={ShareScreenStyle.title}>{selectedConfig.message}</Text>
          {/* The button turns into the note input, focused right away */}
          {showNote ? (
            <TextInput
              autoFocus={editingNote}
              multiline
              submitBehavior="blurAndSubmit"
              returnKeyType="done"
              maxLength={NOTE_MAX_LENGTH}
              value={note}
              onChangeText={setNote}
              onFocus={() => setEditingNote(true)}
              onBlur={() => setEditingNote(false)}
              selectionColor={theme.theme.colors.accent}
              style={ShareScreenStyle.noteInput}
            />
          ) : (
            <Pressable
              hitSlop={20}
              onPress={() => setEditingNote(true)}
              style={ShareScreenStyle.addMessageButton}
            >
              <Text style={ShareScreenStyle.addMessageText}>Add note</Text>
            </Pressable>
          )}
        </EmotionSlider>
      </Pressable>
      <View style={ShareScreenStyle.nextButtonView}>
        <HomeButton
          text={sent ? 'Done!' : sending ? 'Saving...' : 'Save'}
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
