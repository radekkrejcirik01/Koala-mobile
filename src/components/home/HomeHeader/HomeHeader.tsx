import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from '@hooks/useModal';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { ReducerProps } from '@store/index/index.props';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { useTheme } from '@contexts/ThemeContext';

const getHello = (): string => {
  const hellos = ['Hi', 'Hola', 'Hej'];

  const randomIndex = Math.floor(Math.random() * hellos.length);
  return hellos[randomIndex];
};

export const HomeHeader = (): JSX.Element => {
  const { name } = useSelector((state: ReducerProps) => state.user.user);

  const { modalVisible, showModal, hideModal } = useModal();
  const theme = useTheme();
  const [helloText, setHelloText] = useState<string>();

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  useEffect(() => {
    setHelloText(getHello());
  }, []);

  return (
    <View style={HomeHeaderStyle.container}>
      <View style={HomeHeaderStyle.row}>
        <Text
          style={[HomeHeaderStyle.title, { color: theme.theme.colors.text }]}
        >
          {helloText}, {name}
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={showModal}>
          <Text style={HomeHeaderStyle.heartText}>️😴</Text>
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
