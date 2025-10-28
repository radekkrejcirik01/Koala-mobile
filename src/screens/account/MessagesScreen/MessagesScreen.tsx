import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { MessagesScreenStyle } from '@screens/account/MessagesScreen/MessagesScreen.style';
import { useMessagesActions } from '@hooks/useMessagesActions';
import { AddButton } from '@components/general/AddButton/AddButton';
import { Modal } from '@components/general/Modal/Modal';
import { MessageItem } from '@components/home/MessageItem/MessageItem';

export const MessagesScreen = () => {
  const { top } = useSafeAreaInsets();

  const {
    messages,
    modalScreen,
    modalVisible,
    onPressMessage,
    onPressAddEmotion,
    onItemLongPress,
    hideModalAndKeyboard,
    isLoading
  } = useMessagesActions();

  const renderContent = () => {
    if (isLoading) {
      return null;
    }
    if (!messages?.length) {
      return (
        <Text style={MessagesScreenStyle.emptyText}>
          Here you can add your own messages and share them easily when you need
          ✨
        </Text>
      );
    }

    return (
      <ScrollView style={MessagesScreenStyle.contentContainer}>
        {messages?.map((message) => (
          <MessageItem
            key={message.id}
            item={message}
            onPressMessage={() => onPressMessage(message)}
            onItemLongPress={() => onItemLongPress(message)}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={[MessagesScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader
        title="Messages"
        close
        rightComponent={<AddButton onPress={onPressAddEmotion} />}
      />
      {renderContent()}
      <Modal
        isVisible={modalVisible}
        content={modalScreen}
        onClose={hideModalAndKeyboard}
        style={MessagesScreenStyle.modal}
      />
    </View>
  );
};
