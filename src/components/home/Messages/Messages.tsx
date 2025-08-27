import React, { JSX, useCallback, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { DirectSharingModalScreen } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import COLORS from '@constants/COLORS';
import { useTheme } from '@contexts/ThemeContext';

export const Messages = (): JSX.Element => {
  const theme = useTheme();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const { modalVisible, showModal, hideModal } = useModal();

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const onPressDirect = useCallback(() => {
    setModalContent(
      <DirectSharingModalScreen
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

  const onPressFriends = () => {};

  const navigateToProfile = () => {
    navigateTo(AccountStackNavigatorEnum.ProfileScreen);
  };

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View style={MessagesStyle.container}>
      <Text style={MessagesStyle.title}>Start a chat</Text>
      <View style={MessagesStyle.itemsContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressDirect}
          style={MessagesStyle.messagesView}
        >
          <View>
            <View style={MessagesStyle.emojiView}>
              <Text style={MessagesStyle.emojiText}>📚</Text>
            </View>
            <Text style={MessagesStyle.viewText}>Messages</Text>
          </View>
          <Text>Add your own or use ours</Text>
        </TouchableOpacity>
        <View style={MessagesStyle.rightViewsContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressDirect}
            style={MessagesStyle.directView}
          >
            <View style={MessagesStyle.emojiView}>
              <Text style={MessagesStyle.emojiText}>💬</Text>
            </View>
            <Text style={MessagesStyle.viewText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressDirect}
            style={MessagesStyle.voiceView}
          >
            <View style={MessagesStyle.emojiView}>
              <Text style={MessagesStyle.emojiText}>🎤</Text>
            </View>
            <Text style={MessagesStyle.viewText}>Voice</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={MessagesStyle.footerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressFriends}
          style={[
            MessagesStyle.friendsView,
            {
              backgroundColor: theme.isDark
                ? theme.theme.colors.surface
                : COLORS.WHITE
            }
          ]}
        >
          <Text style={MessagesStyle.friendsText}>🔎 Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={navigateToProfile}
          style={[
            MessagesStyle.profileView,
            {
              backgroundColor: theme.isDark
                ? theme.theme.colors.surface
                : COLORS.WHITE
            }
          ]}
        >
          <Text style={MessagesStyle.profileText}>🙆</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        content={modalContent}
        onClose={() => {
          hideModalAndKeyboard();
        }}
        style={MessagesStyle.modal}
      />
    </View>
  );
};
