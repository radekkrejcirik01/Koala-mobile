import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import moment from 'moment';
import fs from 'react-native-fs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAppState } from '@hooks/useAppState';
import { ChatHeader } from '@components/chat/ChatHeader/ChatHeader';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from '@utils/Axios/Axios.service';
import {
  ResponseConversationGetInterface,
  ResponseInterface
} from '@interfaces/response/Response.interface';
import {
  MessagePostInterface,
  ReactionPostInterface
} from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { ConversationInterface } from '@interfaces/general.interface';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { ChatInput } from '@components/chat/ChatInput/ChatInput';
import { SupportButton } from '@components/chat/SupportButton/SupportButton';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';

const CHAT_HEADER_HEIGHT = 45;
const EMOTION_HEADER_HEIGHT = 280;

export const ChatScreen = ({ route }: ChatScreenProps): React.JSX.Element => {
  const {
    id,
    chatUserId,
    name,
    profilePhoto,
    username,
    conversationId
  } = route.params;

  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);

  const { top, bottom } = useSafeAreaInsets();

  const [message, setMessage] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationInterface[]>([]);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [audioRecord, setAudioRecord] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>();
  const [supportedAt, setSupportedAt] = useState<number | undefined>();
  const [supporting, setSupporting] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<ConversationInterface>();

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToEnd = () => {
    setTimeout(() => {
      listRef?.current?.scrollToIndex({ index: 0 });
    }, 50);
  };

  // Helper function to check replies visibility
  // Return true when first messages is inbound and number of inbound messages is 1
  const checkShowReplies = useCallback(
    (data: ConversationInterface[]) => {
      if (data[data?.length - 1]?.senderId === userId) {
        return false;
      }

      const receivedMessages = data?.filter(
        (e: ConversationInterface) => e?.senderId !== userId
      );
      return receivedMessages?.length === 1;
    },
    [userId]
  );

  const updateSeenNotification = useCallback(() => {
    putRequest<ResponseInterface, never>(
      `notification/${conversationId || id}`
    ).subscribe();
  }, [conversationId, id]);

  const getConversation = useCallback(() => {
    setLoaded(false);
    getRequest<ResponseConversationGetInterface>(
      `conversation/${conversationId || id}`
    ).subscribe((response: ResponseConversationGetInterface) => {
      if (response?.status && !!response?.data?.length) {
        const data = response?.data;

        setEmotion(
          data.find(
            (item) =>
              item.type === NotificationItemEnum.DirectEmotionNotificationType
          )
        );

        setConversation(data.reverse());
        setShowReplies(checkShowReplies(data));

        updateSeenNotification();

        setLoaded(true);
      }
    });
  }, [checkShowReplies, conversationId, id, updateSeenNotification]);

  useEffect(() => {
    getConversation();
  }, [getConversation]);

  useEffect(
    () =>
      // On new message
      messaging().onMessage(
        (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          if (remoteMessage) {
            getConversation();
          }
        }
      ),
    [getConversation]
  );

  useAppState(() => getConversation());

  const send = useCallback(
    async (text?: string) => {
      setConversation((prevState) => [
        {
          id: prevState[prevState?.length - 1].id + 1,
          senderId: userId,
          message: text || message,
          time: moment().unix(),
          replyMessage,
          audioMessage: audioRecord
        },
        ...prevState
      ]);

      let base64Buffer;
      if (audioRecord) {
        base64Buffer = await fs.readFile(audioRecord, 'base64');
      }

      setLoaded(false);
      postRequest<ResponseInterface, MessagePostInterface>('message', {
        conversationId: conversationId || id,
        receiverId: chatUserId,
        message: text || message,
        replyMessage,
        audioBuffer: text ? '' : base64Buffer
      }).subscribe((response) => {
        if (response?.status) {
          getConversation();
        }
      });
    },
    [
      audioRecord,
      chatUserId,
      conversationId,
      getConversation,
      id,
      message,
      replyMessage,
      userId
    ]
  );

  const sendReaction = useCallback(
    (reaction: string, messageId: number) => {
      putRequest<ResponseInterface, ReactionPostInterface>(
        `notification-reaction/${messageId}`,
        { reaction }
      ).subscribe((response: ResponseInterface) => {
        if (response?.status) {
          getConversation();
        }
      });
    },
    [getConversation]
  );

  const deleteMessage = useCallback(
    (messageId: number) => {
      if (!loaded) {
        return;
      }

      deleteRequest<ResponseInterface>(`message/${messageId}`).subscribe(
        (response: ResponseInterface) => {
          if (response?.status) {
            getConversation();
          }
        }
      );
    },
    [getConversation, loaded]
  );

  const onPressReply = useCallback(
    (value: string) => {
      send(value).catch();
    },
    [send]
  );

  const onPressSend = useCallback(() => {
    send().catch();
    setMessage('');
    setReplyMessage('');
    setAudioRecord('');

    scrollToEnd();
  }, [send]);

  const onPressSupport = useCallback(() => {
    if (supporting || supportedAt) {
      return;
    }

    setSupporting(true);
    setSupportedAt(Math.floor(Date.now() / 1000));

    putRequest<ResponseInterface, never>(
      `notification-support/${id}`
    ).subscribe((response: ResponseInterface) => {
      setSupporting(false);

      if (response?.status !== 'success') {
        setSupportedAt(undefined);
      }
    });
  }, [id, supporting, supportedAt]);

  const isOwnEmotion = !!emotion && emotion.senderId !== chatUserId;
  const supportSentAt = supportedAt ?? emotion?.supportedAt;
  const showSupportButton = !!emotion && !isOwnEmotion && !supportSentAt;
  const showSupportConfirmation = !showSupportButton && !!supportSentAt;

  return (
    <View style={[ChatScreenStyle.container, { paddingTop: top }]}>
      <ChatHeader
        chatUserId={chatUserId}
        username={username}
        name={name}
        profilePhoto={profilePhoto}
      />
      <View style={ChatScreenStyle.emotionView}>
        <Text style={ChatScreenStyle.emotionText}>{emotion?.emotion}</Text>
        <Text style={ChatScreenStyle.emotionMessageText}>
          {isOwnEmotion ? 'You are' : `${name} is`} feeling{' '}
          {emotion?.message?.toLowerCase()}
        </Text>
        {showSupportConfirmation && (
          <Text style={ChatScreenStyle.supportHintText}>
            {isOwnEmotion ? `${name} sent support` : 'You sent your support'} 🫶
          </Text>
        )}
      </View>
      {showSupportButton ? (
        <View
          style={[
            ChatScreenStyle.supportButtonView,
            { paddingBottom: bottom || 30 }
          ]}
        >
          <SupportButton supporting={supporting} onPress={onPressSupport} />
          <Text style={ChatScreenStyle.supportHintText}>
            Send support to start a chat
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView
          bottomOffset={20}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <View
            style={{
              height:
                Dimensions.get('window').height -
                (top || 10) -
                CHAT_HEADER_HEIGHT -
                bottom -
                EMOTION_HEADER_HEIGHT
            }}
          >
            <ChatList
              listRef={listRef}
              conversation={conversation.filter(
                (item) =>
                  item.type !== NotificationItemEnum.DirectEmotionNotificationType
              )}
              onSelectReaction={sendReaction}
            />
            <ChatInput
              message={message}
              onChangeText={setMessage}
              onPressSend={onPressSend}
              onPressReply={onPressReply}
              onAudioRecord={setAudioRecord}
              replyMessage={replyMessage}
              inputRef={inputRef}
              onFocus={scrollToEnd}
              onDismissReply={() => setReplyMessage('')}
              showReplies={showReplies}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};
