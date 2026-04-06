import React, { JSX, useCallback } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const HomeHeader = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const { modalVisible, showModal, hideModal } = useModal();

  const { name, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const onPressFriends = () => {
    trigger(HapticFeedbackTypes.impactMedium);
    showModal();
  };

  const onPressProfile = () => {
    trigger(HapticFeedbackTypes.impactMedium);
    navigateTo(AccountStackNavigatorEnum.ProfileScreen);
  };

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View style={HomeHeaderStyle.container}>
      <TouchableOpacity
        onPress={onPressFriends}
        activeOpacity={0.8}
        style={HomeHeaderStyle.addFriendsView}
      >
        <Icon name={IconEnum.ADD_FRIEND} size={20} />
      </TouchableOpacity>
      <ProfilePhoto
        name={name}
        photo={profilePhoto}
        size={45}
        onPhotoPress={onPressProfile}
      />
      <Modal
        isVisible={modalVisible}
        content={<FriendsModalScreen />}
        onClose={hideModalAndKeyboard}
        style={HomeHeaderStyle.modal}
      />
    </View>
  );
};
