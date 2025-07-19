import React, { JSX } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useMessagesActions } from '@hooks/useMessagesActions';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Modal } from '@components/general/Modal/Modal';
import { KudosScreenStyle } from '@screens/account/KudosScreen/KudosScreen.style';
import { MessageItem } from '@components/home/MessageItem/MessageItem';
import { AddButton } from '@components/general/AddButton/AddButton';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const KudosScreen = (): JSX.Element => {
  const { top } = useSafeAreaInsets();

  const {
    messages,
    modalScreen,
    modalVisible,
    onPressMessage,
    onPressAddEmotion,
    onItemLongPress,
    hideModalAndKeyboard
  } = useMessagesActions(EmotionScreenMessageType.Kudos);

  return (
    <View style={[KudosScreenStyle.container, { top }]}>
      <ScreenHeader
        title="Kudos"
        rightComponent={<AddButton onPress={onPressAddEmotion} />}
      />
      <ScrollView contentContainerStyle={KudosScreenStyle.scrollView}>
        <View style={KudosScreenStyle.imageContainer}>
          <FastImage
            source={require('../../../assets/images/Kudos_no_bg.png')}
            style={KudosScreenStyle.image}
          />
        </View>
        <View style={KudosScreenStyle.messagesContainer}>
          {messages.map((value, index) => (
            <MessageItem
              key={value.id}
              item={value}
              index={index}
              onPressMessage={() => onPressMessage(value)}
              onItemLongPress={() => onItemLongPress(value)}
            />
          ))}
        </View>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        content={modalScreen}
        onClose={hideModalAndKeyboard}
        style={KudosScreenStyle.modal}
      />
    </View>
  );
};
