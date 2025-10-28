import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { EmotionInterface } from '@interfaces/general.interface';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useModal } from '@hooks/useModal';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
  ResponseEmotionsGetInterface,
  ResponseInterface
} from '@interfaces/response/Response.interface';
import { SendModalScreen } from '@components/home/SendModalScreen/SendModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';

export const useMessagesActions = (): {
  messages: EmotionInterface[];
  modalScreen: JSX.Element;
  modalVisible: boolean;
  onPressMessage: (item: EmotionInterface) => void;
  onPressAddEmotion: () => void;
  onItemLongPress: (item: EmotionInterface) => void;
  hideModalAndKeyboard: () => void;
} => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { modalVisible, showModal, hideModal } = useModal();

  const [messages, setMessages] = useState<EmotionInterface[]>([]);
  const [modalScreen, setModalScreen] = useState<JSX.Element>(<></>);

  const loadMessages = useCallback(() => {
    getRequest<ResponseEmotionsGetInterface>('/emotions').subscribe(
      (response: ResponseEmotionsGetInterface) => {
        const data = response?.data;
        if (data?.length) {
          setMessages(data?.reverse());
        }
      }
    );
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const onPressMessage = useCallback(
    (item: EmotionInterface) => {
      setModalScreen(
        <SendModalScreen
          item={item}
          onAddFriendPress={() => {
            hideModal();
            setModalScreen(<FriendsModalScreen />);
            setTimeout(() => {
              showModal();
            }, 100);
          }}
        />
      );
      showModal();
    },
    [hideModal, showModal]
  );

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  const onPressAddEmotion = useCallback(() => {
    setModalScreen(
      <AddEmotionModalScreen
        onAdded={() => {
          loadMessages();
          hideModalAndKeyboard();
        }}
      />
    );
    showModal();
  }, [hideModalAndKeyboard, loadMessages, showModal]);

  const removeEmotion = useCallback(
    (id: number) => {
      deleteRequest<ResponseInterface>(`emotion/${id}`).subscribe(
        (response: ResponseInterface) => {
          if (response?.status) {
            loadMessages();
          }
        }
      );
    },
    [loadMessages]
  );

  const onItemLongPress = useCallback(
    (item: EmotionInterface) => {
      const options = ['Remove message', 'Cancel'];

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 1,
          userInterfaceStyle: 'light',
          title: item?.message
        },
        (selectedIndex: number) => {
          if (selectedIndex === 0) {
            removeEmotion(item?.id);
          }
        }
      );
    },
    [removeEmotion, showActionSheetWithOptions]
  );

  return {
    messages,
    modalScreen,
    modalVisible,
    onPressMessage,
    onPressAddEmotion,
    onItemLongPress,
    hideModalAndKeyboard
  };
};
