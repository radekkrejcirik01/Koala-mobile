import React, { JSX } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useMessagesActions } from '@hooks/useMessagesActions';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Modal } from '@components/general/Modal/Modal';
import { DepressionScreenStyle } from '@screens/account/DepressionScreen/DepressionScreen.style';
import { MessageItem } from '@components/home/MessageItem/MessageItem';
import { AddButton } from '@components/general/AddButton/AddButton';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const DepressionScreen = (): JSX.Element => {
  const { top } = useSafeAreaInsets();

  const {
    messages,
    modalScreen,
    modalVisible,
    onPressMessage,
    onPressAddEmotion,
    onItemLongPress,
    hideModalAndKeyboard
  } = useMessagesActions(EmotionScreenMessageType.Depression);

  return (
    <View style={[DepressionScreenStyle.container, { top }]}>
      <ScreenHeader
        title="Depression"
        rightComponent={<AddButton onPress={onPressAddEmotion} />}
      />
      <ScrollView>
        <View style={DepressionScreenStyle.imageContainer}>
          <FastImage
            source={require('../../../assets/images/Depression_no_bg.png')}
            style={DepressionScreenStyle.image}
          />
        </View>
        <View style={DepressionScreenStyle.messagesContainer}>
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
        style={DepressionScreenStyle.modal}
      />
    </View>
  );
};
