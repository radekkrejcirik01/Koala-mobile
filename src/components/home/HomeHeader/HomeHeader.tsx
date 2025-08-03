import React, { JSX, useCallback } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from '@hooks/useModal';
import { HomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { useTheme } from '@contexts/ThemeContext';
import COLORS from '@constants/COLORS';
import { ReducerProps } from '@store/index/index.props';

export const HomeHeader = (): JSX.Element => {
  const { name } = useSelector((state: ReducerProps) => state.user.user);

  const { modalVisible, showModal, hideModal } = useModal();
  const theme = useTheme();

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View style={HomeHeaderStyle.container}>
      <View style={HomeHeaderStyle.row}>
        <Text style={HomeHeaderStyle.appName}>Koala</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={showModal}
          style={[
            HomeHeaderStyle.buttonView,
            {
              backgroundColor: theme.isDark
                ? theme.theme.colors.background
                : COLORS.WHITE
            }
          ]}
        >
          <Text style={HomeHeaderStyle.buttonText}>️🔎</Text>
        </TouchableOpacity>
      </View>
      <Text style={[HomeHeaderStyle.title, { color: COLORS.BUTTON_BLUE }]}>
        {`Hi ${name},\nhow do you feel today?`}
      </Text>
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
