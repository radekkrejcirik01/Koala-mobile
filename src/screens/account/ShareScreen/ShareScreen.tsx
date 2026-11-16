import React, { JSX, useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
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
      <View style={ShareScreenStyle.mainView}>
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
            <Text
              style={[
                ShareScreenStyle.title,
                { color: theme.theme.colors.text }
              ]}
            >
              {(emotion && trimmedMessage) || title}
            </Text>
          )}
        </View>
        <View style={ShareScreenStyle.contentView}>
          <View style={ShareScreenStyle.emotionsView}>
            {EMOTIONS.map((item) => (
              <EmotionItem
                key={item.type}
                emotion={item}
                selected={emotion === item.type}
                onPress={() => onEmotionSelect(item.type)}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={ShareScreenStyle.nextButtonView}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!emotion}
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
