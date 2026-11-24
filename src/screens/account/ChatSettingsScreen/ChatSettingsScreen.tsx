import React, { JSX, useCallback, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { useNavigation } from '@hooks/useNavigation';
import { getRequest } from '@utils/Axios/Axios.service';
import {
  ResponseChatEmotionsGetInterface,
  ResponseChatSettingsGetInterface,
  ResponseFriendsGetInterface
} from '@interfaces/response/Response.interface';
import { ChatSettingsInterface } from '@interfaces/general.interface';
import COLORS from '@constants/COLORS';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ChatSettingsScreenProps } from '@screens/account/ChatSettingsScreen/ChatSettingsScreen.props';
import { ChatSettingsScreenStyle } from '@screens/account/ChatSettingsScreen/ChatSettingsScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';

export const ChatSettingsScreen = ({
  route
}: ChatSettingsScreenProps): JSX.Element => {
  const { friend } = route.params;

  const { colors } = useTheme().theme;
  const { top, bottom } = useSafeAreaInsets();

  const [settings, setSettings] = useState<ChatSettingsInterface>({});
  // Emotions both of them shared in the chat, undefined until loaded
  const [emotionsCount, setEmotionsCount] = useState<number>();
  // An ex-friend's chat stays, but can't get a nickname, theme or mood
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [photoOpen, setPhotoOpen] = useState<boolean>(false);

  // Also after coming back from editing the nickname or theme
  const load = useCallback(() => {
    getRequest<ResponseChatSettingsGetInterface>(
      `chats/${friend.id}/settings`
    ).subscribe((response: ResponseChatSettingsGetInterface) => {
      if (response?.status) {
        setSettings(response.data ?? {});
      }
    });

    getRequest<ResponseChatEmotionsGetInterface>(
      `chats/${friend.id}/emotions`
    ).subscribe((response: ResponseChatEmotionsGetInterface) => {
      if (response?.status) {
        setEmotionsCount(
          (response.userCount ?? 0) + (response.friendCount ?? 0)
        );
      }
    });

    getRequest<ResponseFriendsGetInterface>('friends').subscribe(
      (response: ResponseFriendsGetInterface) => {
        if (response?.status) {
          setIsFriend(!!response.data?.some((item) => item.id === friend.id));
        }
      }
    );
  }, [friend.id]);

  const { navigateTo } = useNavigation(
    RootStackNavigatorEnum.AccountStack,
    load
  );

  const params = { friend: { ...friend, nickname: settings.nickname } };

  const actions = [
    {
      icon: '🔍',
      label: 'Search',
      screen: AccountStackNavigatorEnum.ChatSearchScreen,
      visible: true
    },
    {
      icon: '✏️',
      label: 'Edit name',
      screen: AccountStackNavigatorEnum.ChatNicknameScreen,
      visible: isFriend
    },
    {
      icon: '🎨',
      label: 'Theme',
      screen: AccountStackNavigatorEnum.ChatThemeScreen,
      visible: isFriend
    }
  ];

  return (
    <View style={[ChatSettingsScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="" />
      <ScrollView
        // Scrolls even while the content fits the screen
        alwaysBounceVertical
        contentContainerStyle={{ paddingBottom: bottom + 30 }}
      >
        <View style={ChatSettingsScreenStyle.profileView}>
          <ProfilePhoto
            name={settings.nickname || friend.name}
            photo={friend.profilePhoto}
            size={90}
            onPhotoPress={
              friend.profilePhoto ? () => setPhotoOpen(true) : undefined
            }
          />
          <Text
            style={[ChatSettingsScreenStyle.nameText, { color: colors.text }]}
          >
            {settings.nickname || friend.name}
          </Text>
          <Text style={ChatSettingsScreenStyle.usernameText}>
            {settings.nickname
              ? `${friend.name} · @${friend.username}`
              : `@${friend.username}`}
          </Text>
        </View>
        <View style={ChatSettingsScreenStyle.actionsView}>
          {actions
            .filter((item) => item.visible)
            .map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.7}
                onPress={() => navigateTo(item.screen, params)}
                style={ChatSettingsScreenStyle.actionView}
              >
                <View
                  style={[
                    ChatSettingsScreenStyle.actionIconView,
                    { backgroundColor: colors.surface }
                  ]}
                >
                  <Text style={ChatSettingsScreenStyle.actionIconText}>
                    {item.icon}
                  </Text>
                </View>
                <Text style={ChatSettingsScreenStyle.actionText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <ProfileSection>
          {isFriend && (
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.ChatMoodScreen, params)
              }
              icon="📊"
              iconBackgroundColor={COLORS.PASTEL_BLUE}
              title="Mood overview"
              value="30 days"
            />
          )}
          <ProfileItem
            onPress={() =>
              navigateTo(AccountStackNavigatorEnum.ChatEmotionsScreen, params)
            }
            icon="💛"
            iconBackgroundColor={COLORS.PASTEL_YELLOW}
            title="Shared emotions"
            value={emotionsCount === undefined ? '' : String(emotionsCount)}
            isLast
          />
        </ProfileSection>
      </ScrollView>
      {!!friend.profilePhoto && (
        <Modal
          visible={photoOpen}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setPhotoOpen(false)}
        >
          {/* Tapping anywhere closes it */}
          <Pressable
            onPress={() => setPhotoOpen(false)}
            style={ChatSettingsScreenStyle.photoBackdrop}
          >
            <FastImage
              source={{ uri: friend.profilePhoto }}
              resizeMode={FastImage.resizeMode.contain}
              style={ChatSettingsScreenStyle.photoImage}
            />
            <Text
              style={[ChatSettingsScreenStyle.photoClose, { top: top + 10 }]}
            >
              ✕
            </Text>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};
