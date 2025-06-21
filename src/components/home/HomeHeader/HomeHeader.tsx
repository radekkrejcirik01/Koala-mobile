import React, { JSX, useCallback } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from '@hooks/useModal';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { ReducerProps } from '@store/index/index.props';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';

export const HomeHeader = (): JSX.Element => {
  const { name } = useSelector((state: ReducerProps) => state.user.user);

  const { modalVisible, showModal, hideModal } = useModal();

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View style={HomeHeaderStyle.container}>
      <View style={HomeHeaderStyle.row}>
        <Text style={HomeHeaderStyle.title}>Hi, {name}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={showModal}>
          <Text style={HomeHeaderStyle.heartText}>🤍</Text>
        </TouchableOpacity>
      </View>
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
