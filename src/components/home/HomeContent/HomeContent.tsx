import React, { JSX, useCallback, useState } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { HomeContentStyle } from '@components/home/HomeContent/HomeContent.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import COLORS from '@constants/COLORS';
import { useTheme } from '@contexts/ThemeContext';

const BottomButton = ({
  text,
  onPress
}: {
  text: string;
  onPress: () => void;
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        HomeContentStyle.bottomButtonView,
        {
          backgroundColor: theme.isDark
            ? theme.theme.colors.surface
            : COLORS.WHITE
        }
      ]}
    >
      <Text
        style={[
          HomeContentStyle.bottomButtonText,
          { color: theme.theme.colors.text }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const HomeContent = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const { modalVisible, showModal, hideModal } = useModal();

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const onPressMessages = () => {
    navigateTo(AccountStackNavigatorEnum.MessagesScreen);
  };

  const onPressShare = useCallback(() => {
    setModalContent(
      <ShareModalScreen
        onAddFriendPress={() => {
          hideModal();
          setModalContent(<FriendsModalScreen />);
          setTimeout(() => {
            showModal();
          }, 100);
        }}
      />
    );
    showModal();
  }, [hideModal, showModal]);

  const onPressVoice = () => {
    Alert.alert('This feature is coming soon ✨');
  };

  const onPressFriends = () => {
    setModalContent(<FriendsModalScreen />);
    showModal();
  };

  const onPressProfile = () => {
    navigateTo(AccountStackNavigatorEnum.ProfileScreen);
  };

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={HomeContentStyle.container}
    >
      <View style={HomeContentStyle.itemsContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressMessages}
          style={HomeContentStyle.messagesView}
        >
          <View>
            <View style={HomeContentStyle.emojiView}>
              <Text style={HomeContentStyle.emojiText}>📚</Text>
            </View>
            <Text style={HomeContentStyle.viewText}>Messages</Text>
          </View>
          <Text>Add messages for sharing</Text>
        </TouchableOpacity>
        <View style={HomeContentStyle.rightViewsContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressShare}
            style={HomeContentStyle.directView}
          >
            <View style={HomeContentStyle.emojiView}>
              <Text style={HomeContentStyle.emojiText}>💬</Text>
            </View>
            <Text style={HomeContentStyle.viewText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressVoice}
            style={HomeContentStyle.voiceView}
          >
            <View style={HomeContentStyle.emojiView}>
              <Text style={HomeContentStyle.emojiText}>🎤</Text>
            </View>
            <Text style={HomeContentStyle.viewText}>Voice</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={HomeContentStyle.footerContainer}>
        <BottomButton text="🔎 Friends" onPress={onPressFriends} />
        <BottomButton text="🙆 Profile" onPress={onPressProfile} />
      </View>
      <Modal
        isVisible={modalVisible}
        content={modalContent}
        onClose={hideModalAndKeyboard}
        style={HomeContentStyle.modal}
      />
    </ScrollView>
  );
};
