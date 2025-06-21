import React, { JSX } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useMessagesActions } from '@hooks/useMessagesActions';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AnxietyAndPanicScreenStyle } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.style';
import { Modal } from '@components/general/Modal/Modal';
import { MessageItem } from '@components/home/MessageItem/MessageItem';
import { AddButton } from '@components/general/AddButton/AddButton';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const AnxietyAndPanicScreen = (): JSX.Element => {
  const { top } = useSafeAreaInsets();

  const {
    messages,
    modalScreen,
    modalVisible,
    onPressMessage,
    onPressAddEmotion,
    onItemLongPress,
    hideModalAndKeyboard
  } = useMessagesActions(EmotionScreenMessageType.Anxiety);

  return (
    <View style={[AnxietyAndPanicScreenStyle.container, { top }]}>
      <ScreenHeader
        title="Anxiety & panic"
        rightComponent={<AddButton onPress={onPressAddEmotion} />}
      />
      <ScrollView contentContainerStyle={AnxietyAndPanicScreenStyle.scrollView}>
        <View style={AnxietyAndPanicScreenStyle.imageContainer}>
          <FastImage
            source={require('../../../assets/images/Anxiety.png')}
            style={AnxietyAndPanicScreenStyle.image}
          />
        </View>
        <View style={AnxietyAndPanicScreenStyle.line} />
        <View style={AnxietyAndPanicScreenStyle.messagesContainer}>
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
        style={AnxietyAndPanicScreenStyle.modal}
      />
    </View>
  );
};
