import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useTheme } from '@hooks/useTheme';
import { getRequest, putRequest } from '@utils/Axios/Axios.service';
import { ChatThemeCache } from '@utils/general/ChatThemeCache';
import {
  ResponseChatSettingsGetInterface,
  ResponseInterface
} from '@interfaces/response/Response.interface';
import { ChatSettingsPostInterface } from '@interfaces/post/Post.interface';
import {
  CHAT_THEMES,
  ChatThemeConfig,
  DEFAULT_CHAT_THEME,
  getChatBackground,
  getChatTheme
} from '@constants/CHAT_THEMES';
import COLORS from '@constants/COLORS';
import { ChatThemeScreenProps } from '@screens/account/ChatThemeScreen/ChatThemeScreen.props';
import { useChatThemeScreenStyle } from '@screens/account/ChatThemeScreen/ChatThemeScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';

export const ChatThemeScreen = ({
  route
}: ChatThemeScreenProps): JSX.Element => {
  const ChatThemeScreenStyle = useChatThemeScreenStyle();
  const { friend } = route.params;

  const { theme, isDark } = useTheme();
  const { colors } = theme;
  const { top, bottom } = useSafeAreaInsets();

  // Undefined until loaded, nothing shows as selected meanwhile
  const [selectedKey, setSelectedKey] = useState<string>();

  useEffect(() => {
    getRequest<ResponseChatSettingsGetInterface>(
      `chats/${friend.id}/settings`
    ).subscribe((response: ResponseChatSettingsGetInterface) => {
      if (response?.status) {
        setSelectedKey(getChatTheme(response.data?.theme).key);
      }
    });
  }, [friend.id]);

  // Shown right away, a failure takes it back
  const onSelect = useCallback(
    (key: string) => {
      if (key === selectedKey) {
        return;
      }

      trigger(HapticFeedbackTypes.impactLight);
      const previousKey = selectedKey;
      setSelectedKey(key);

      putRequest<ResponseInterface, ChatSettingsPostInterface>(
        `chats/${friend.id}/settings`,
        { theme: key === DEFAULT_CHAT_THEME.key ? null : key }
      ).subscribe((response: ResponseInterface) => {
        if (!response?.status) {
          setSelectedKey(previousKey);
          Alert.alert('Failed to change the theme. Please try again.');
          return;
        }

        ChatThemeCache.set(
          friend.id,
          key === DEFAULT_CHAT_THEME.key ? undefined : key
        );
      });
    },
    [friend.id, selectedKey]
  );

  return (
    <View style={[ChatThemeScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Theme" />
      <ScrollView
        contentContainerStyle={[
          ChatThemeScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      >
        <FormIntro
          emoji="🎨"
          emojiBackgroundColor={COLORS.PASTEL_PURPLE}
          title="Only you see the theme"
        />
        {CHAT_THEMES.map((item: ChatThemeConfig) => {
          const selected = item.key === selectedKey;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.8}
              onPress={() => onSelect(item.key)}
              style={[
                ChatThemeScreenStyle.themeCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: selected
                    ? colors.accent
                    : COLORS.TRANSPARENT
                }
              ]}
            >
              <View
                style={[
                  ChatThemeScreenStyle.preview,
                  {
                    backgroundColor:
                      getChatBackground(item, isDark) ?? colors.background
                  }
                ]}
              >
                <View
                  style={[
                    ChatThemeScreenStyle.previewBubble,
                    ChatThemeScreenStyle.previewInbound
                  ]}
                />
                <View
                  style={[
                    ChatThemeScreenStyle.previewBubble,
                    ChatThemeScreenStyle.previewOutbound,
                    { backgroundColor: item.bubble }
                  ]}
                />
              </View>
              <View style={ChatThemeScreenStyle.footerRow}>
                <Text
                  style={[ChatThemeScreenStyle.name, { color: colors.text }]}
                >
                  {item.name}
                </Text>
                <View
                  style={[
                    ChatThemeScreenStyle.radio,
                    selected && ChatThemeScreenStyle.radioSelected
                  ]}
                >
                  {selected && (
                    <Text style={ChatThemeScreenStyle.radioCheck}>✓</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
