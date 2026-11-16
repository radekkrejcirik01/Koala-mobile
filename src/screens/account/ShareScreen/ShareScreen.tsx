import React, { JSX, useCallback, useMemo, useState } from 'react';
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
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { EmotionType } from '@enums/EmotionType';
import { EMOTIONS } from '@constants/EMOTIONS';
import COLORS from '@constants/COLORS';
import { EmotionItem } from '@components/home/EmotionItem/EmotionItem';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ShareScreenStyle } from '@screens/account/ShareScreen/ShareScreen.style';

const MESSAGE_MAX_LENGTH = 128;

export const ShareScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { navigateTo } = useNavigation();

  // Dims the emotions together with the keyboard while the message is typed,
  // progress goes from 0 (closed) to 1 (open)
  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation();
  const emotionsStyle = useAnimatedStyle(() => ({
    opacity: 1 - keyboardProgress.value * 0.7
  }));

  const [emotion, setEmotion] = useState<EmotionType>();
  const [message, setMessage] = useState<string>('');
  const [editingMessage, setEditingMessage] = useState<boolean>(false);

  const selectedConfig = useMemo(
    () => EMOTIONS.find((item) => item.type === emotion),
    [emotion]
  );

  const title = selectedConfig?.message ?? 'How are we feeling?';
  const trimmedMessage = message.trim();

  const onEmotionSelect = useCallback((type: EmotionType) => {
    setEmotion((current) => (current === type ? undefined : type));
  }, []);

  const onNext = useCallback(() => {
    if (!emotion) {
      Alert.alert('Please select how you are feeling first');
      return;
    }

    navigateTo(AccountStackNavigatorEnum.ShareSendScreen, {
      emotion,
      message: trimmedMessage || undefined
    });
  }, [emotion, navigateTo, trimmedMessage]);

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
          {selectedConfig && (
            <Text style={ShareScreenStyle.selectedEmoji}>
              {selectedConfig.type}
            </Text>
          )}
          {editingMessage && emotion ? (
            <TextInput
              autoFocus
              multiline
              submitBehavior="blurAndSubmit"
              returnKeyType="done"
              maxLength={MESSAGE_MAX_LENGTH}
              placeholder={title}
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
            <Pressable
              disabled={!emotion}
              hitSlop={15}
              onPress={() => setEditingMessage(true)}
            >
              <Text
                style={[
                  ShareScreenStyle.title,
                  { color: theme.theme.colors.text }
                ]}
              >
                {(emotion && trimmedMessage) || title}
              </Text>
            </Pressable>
          )}
        </View>
        <View style={ShareScreenStyle.contentView}>
          <Animated.View
            // While typing, taps on the emotions fall through and close the keyboard
            pointerEvents={editingMessage ? 'none' : 'auto'}
            style={[ShareScreenStyle.emotionsView, emotionsStyle]}
          >
            {EMOTIONS.map((item) => (
              <EmotionItem
                key={item.type}
                emotion={item}
                selected={emotion === item.type}
                onPress={() => onEmotionSelect(item.type)}
              />
            ))}
          </Animated.View>
        </View>
      </Pressable>
      <View style={ShareScreenStyle.nextButtonView}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!emotion}
          hitSlop={15}
          onPress={() => setEditingMessage(true)}
          style={ShareScreenStyle.messageButton}
        >
          <Text
            style={[
              ShareScreenStyle.messageButtonText,
              !emotion && ShareScreenStyle.messageButtonTextDisabled
            ]}
          >
            Add message
          </Text>
        </TouchableOpacity>
        <HomeButton text="Next" onPress={onNext} />
      </View>
    </View>
  );
};
