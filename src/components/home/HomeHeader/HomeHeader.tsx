import React, { JSX, useCallback } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { NotificationsButton } from '@components/home/NotificationsButton/NotificationsButton';
import { ReducerProps } from '@store/index/index.props';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';

export const HomeHeader = (): JSX.Element => {
  const { name } = useSelector((state: ReducerProps) => state.user.user);

  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const { modalVisible, showModal, hideModal } = useModal();

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View style={HomeHeaderStyle.container}>
      <View style={HomeHeaderStyle.friendsView}>
        <TouchableOpacity activeOpacity={0.8} onPress={showModal}>
          <Text style={HomeHeaderStyle.friendsText}>🙎‍♂️🙎‍♀️</Text>
        </TouchableOpacity>
        <NotificationsButton
          onPress={() =>
            navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
          }
        />
      </View>
      <Text style={HomeHeaderStyle.title}>Hi, {name} 😴</Text>
      <Modal
        isVisible={modalVisible}
        content={<FriendsModalScreen />}
        onClose={() => {
          hideModalAndKeyboard();
        }}
        style={HomeHeaderStyle.modal}
      />
    </View>
  );
};
