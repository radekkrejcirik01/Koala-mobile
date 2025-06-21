import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { usePrompt } from '@hooks/usePrompt';
import { useSending } from '@hooks/useSending';
import { useModal } from '@hooks/useModal';
import { CheckOnScreenStyle } from '@screens/account/CheckOnScreen/CheckOnScreen.style';
import COLORS from '@constants/COLORS';
import { filterSelected } from '@functions/filterSelected';
import {
  deleteRequest,
  getRequest,
  postRequest
} from '@utils/Axios/Axios.service';
import {
  ResponseCheckOnMessagesGetInterface,
  ResponseInterface,
  ResponseRepliesGetInterface
} from '@interfaces/response/Response.interface';
import {
  CheckOnMessagePostInterface,
  CheckOnMessageSendInterface
} from '@interfaces/post/Post.interface';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Send } from '@components/home/Send/Send';
import { CheckOnHeader } from '@components/check-on/CheckOnHeader/CheckOnHeader';
import {
  QuestionInterface,
  QUESTIONS
} from '@screens/account/CheckOnScreen/CheckOnScreen.const';
import { Prompt } from '@components/general/Prompt/Prompt';
import { ReducerProps } from '@store/index/index.props';

export const CheckOnScreen = () => {
  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);

  const { top } = useSafeAreaInsets();
  const { modalVisible, showModal, hideModal } = useModal();
  const { sending, sent, setSending, setSent } = useSending();
  const { promptVisible, showPrompt, hidePrompt } = usePrompt();

  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [message, setMessage] = useState<string>('How is it going today?');

  const selectedFriends = useRef<number[]>([]);

  const getQuestions = useCallback(() => {
    getRequest<ResponseCheckOnMessagesGetInterface>(
      `check-on-messages/${userId}`
    ).subscribe((response: ResponseRepliesGetInterface) => {
      if (response?.status && !!response?.data?.length) {
        setQuestions([...QUESTIONS, ...response?.data]);
      } else {
        setQuestions(QUESTIONS);
      }
    });
  }, [userId]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const add = useCallback(
    (value: string) => {
      postRequest<ResponseInterface, CheckOnMessagePostInterface>(
        'user-check-on-message',
        {
          message: value
        }
      ).subscribe((response) => {
        if (response?.status) {
          getQuestions();
        }
      });
    },
    [getQuestions]
  );

  const remove = useCallback(
    (item: QuestionInterface) => {
      // Allow removing only custom replies
      if (item?.isDefault) {
        return;
      }

      Alert.alert(item.message, '', [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          onPress: () => {
            deleteRequest<ResponseInterface>(
              `check-on-message/${item.id}`
            ).subscribe((response: ResponseInterface) => {
              if (response?.status) {
                getQuestions();
              }
            });
          },
          style: 'destructive'
        }
      ]);
    },
    [getQuestions]
  );

  const onFriendSelect = (id: number) => {
    setSent(false);

    selectedFriends.current = filterSelected(selectedFriends.current, id);
  };

  const send = useCallback(() => {
    const selected = selectedFriends.current;

    if (!message?.length) {
      Alert.alert('Please write a message first');
      return;
    }
    if (!selected.length) {
      Alert.alert('Please select a friend first');
      return;
    }

    setSending(true);

    postRequest<ResponseInterface, CheckOnMessageSendInterface>(
      'check-on-message',
      {
        ids: selected,
        message
      }
    ).subscribe((response: ResponseInterface) => {
      if (response?.status === 'success') {
        setSending(false);
        setSent(true);

        selectedFriends.current = [];
      }
    });
  }, [message, setSending, setSent]);

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <>
      <ScrollView
        style={{ marginTop: top }}
        contentContainerStyle={CheckOnScreenStyle.contentContainer}
      >
        <CheckOnHeader onPressAdd={showPrompt} />
        <View style={CheckOnScreenStyle.questionsContainer}>
          {questions.map((value, index) => (
            <TouchableOpacity
              key={value.id.toString() + index.toString()}
              activeOpacity={0.9}
              delayLongPress={150}
              onPress={() => setMessage(value.message)}
              onLongPress={() => remove(value)}
              style={CheckOnScreenStyle.questionView}
            >
              <Text
                style={[
                  CheckOnScreenStyle.questionText,
                  {
                    color:
                      value.message === message
                        ? COLORS.BUTTON_BLUE
                        : COLORS.LIGHTGRAY_200
                  }
                ]}
              >
                {value.message}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          value={message}
          onChangeText={setMessage}
          autoCorrect={false}
          selectionColor={COLORS.BUTTON_BLUE}
          style={CheckOnScreenStyle.input}
        />
        <Send
          onFriendSelect={onFriendSelect}
          onAddFriendPress={showModal}
          onPressSend={send}
          sending={sending}
          sent={sent}
          style={CheckOnScreenStyle.send}
        />
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        content={<FriendsModalScreen />}
        onClose={hideModalAndKeyboard}
        style={MessagesStyle.modal}
      />
      <Prompt
        title="Add"
        isVisible={promptVisible}
        onPressOk={add}
        onClose={hidePrompt}
      />
    </>
  );
};
