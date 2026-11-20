import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { FlashListRef } from '@shopify/flash-list';
import { useTypingSender } from '@hooks/useTypingSender';
import { ChatHeader } from '@components/chat/ChatHeader/ChatHeader';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from '@utils/Axios/Axios.service';
import { NotificationsService } from '@utils/general/NotificationsService';
import { LiveService } from '@utils/general/LiveService';
import {
  ResponseFriendsGetInterface,
  ResponseInterface,
  ResponseMessagePostInterface,
  ResponseMessagesGetInterface
} from '@interfaces/response/Response.interface';
import {
  MessagePostInterface,
  ReactionPostInterface
} from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { MessageInterface } from '@interfaces/general.interface';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { ChatInput } from '@components/chat/ChatInput/ChatInput';
import { MessageType } from '@enums/MessageType';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';
import { mergeLatestMessages } from '@functions/mergeLatestMessages';
import { SUPPORT_REACTION } from '@constants/SUPPORT_REACTION';
import { LiveEventType } from '@enums/LiveEventType';

// Gap between the input and the open keyboard
const KEYBOARD_INPUT_GAP = 5;

export const ChatScreen = ({ route }: ChatScreenProps): React.JSX.Element => {
  const { id: friendId } = route.params;

  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);
  const typing = useSelector((state: ReducerProps) =>
    state.live.typingIds.includes(friendId)
  );

  const { top, bottom } = useSafeAreaInsets();

  // Follows the keyboard frame by frame, height is negative while it is open
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
  const chatViewStyle = useAnimatedStyle(
    () => ({
      paddingBottom: Math.max(
        bottom,
        -keyboardHeight.value + KEYBOARD_INPUT_GAP
      )
    }),
    [bottom]
  );

  const [friend, setFriend] = useState(route.params);
  const [message, setMessage] = useState<string>('');
  // Newest first, the list is inverted
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  // Read position from before the chat was opened, kept while it stays open
  // as later loads already return the position moved by markAsRead
  const [lastReadId, setLastReadId] = useState<number>();

  const hasOlder = useRef<boolean>(false);
  const lastReadLoaded = useRef<boolean>(false);
  const loadingOlder = useRef<boolean>(false);
  // Emotions whose support is still being sent, a refresh keeps them supported
  const supportingIds = useRef<Set<number>>(new Set());

  const listRef = useRef<FlashListRef<MessageInterface>>(null);
  const inputRef = useRef(null);

  // The server ignores typing to an ex-friend
  const { onTyping, stopTyping } = useTypingSender(friendId);

  // Opened from a push, the header needs the friend's name and photo
  useEffect(() => {
    if (friend.name) {
      return;
    }

    getRequest<ResponseFriendsGetInterface>('friends').subscribe(
      (response: ResponseFriendsGetInterface) => {
        const value = response?.data?.find((item) => item.id === friendId);
        if (value) {
          setFriend({ ...value, id: friendId });
        }
      }
    );
  }, [friend.name, friendId]);

  const scrollToEnd = () => {
    setTimeout(() => {
      listRef?.current?.scrollToIndex({ index: 0 });
    }, 50);
  };

  const markAsRead = useCallback(() => {
    putRequest<ResponseInterface, never>(`chats/${friendId}/read`).subscribe(
      () => NotificationsService.getUnreadChats()
    );
  }, [friendId]);

  const loadMessages = useCallback(() => {
    getRequest<ResponseMessagesGetInterface>(
      `chats/${friendId}/messages`
    ).subscribe((response: ResponseMessagesGetInterface) => {
      if (response?.status) {
        const data = response.data ?? [];

        // Only kept when the friend wrote something unread before opening,
        // replies arriving while the chat is open are read right away
        if (!lastReadLoaded.current) {
          lastReadLoaded.current = true;
          const { lastReadId: readId } = response;
          const hasUnread =
            readId !== undefined &&
            data.some((item) => item.id > readId && item.senderId === friendId);
          if (hasUnread) {
            setLastReadId(readId);
          }
        }

        setMessages((prevState) => {
          const merged = mergeLatestMessages(data, prevState);
          // Safe in the updater, a rerun assigns the same value
          if (merged.hasOlder !== undefined) {
            hasOlder.current = merged.hasOlder;
          }

          return merged.messages.map((item) =>
            supportingIds.current.has(item.id)
              ? { ...item, reaction: SUPPORT_REACTION }
              : item
          );
        });

        markAsRead();
      }
    });
  }, [friendId, markAsRead]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Changes may have been missed while disconnected, also covers returning
  // to the foreground as the socket reconnects then
  useEffect(() => LiveService.onConnect(loadMessages), [loadMessages]);

  const addMessage = useCallback(
    (received: MessageInterface) => {
      setMessages((prevState) => {
        if (prevState.some((item) => item.id === received.id)) {
          return prevState;
        }

        const sending = prevState.filter((item) => item.id < 0);
        const loaded = prevState.filter((item) => item.id > 0);

        // Sent from this device before its response came, it replaces the
        // oldest bubble with the same text
        const tempId =
          received.senderId === userId
            ? sending
                .slice()
                .reverse()
                .find((item) => item.message === received.message)?.id
            : undefined;

        return [
          ...sending.filter((item) => item.id !== tempId),
          received,
          ...loaded
        ];
      });

      // Read right away so they don't show as unread the next time the chat
      // opens
      if (received.senderId === friendId) {
        markAsRead();
      }
    },
    [friendId, markAsRead, userId]
  );

  // Changes in this chat arrive live, from the friend and the user's devices
  useEffect(
    () =>
      LiveService.subscribe((event) => {
        if (!('friendId' in event.data) || event.data.friendId !== friendId) {
          return;
        }

        switch (event.type) {
          case LiveEventType.MessageNew:
            addMessage(event.data.message);
            break;
          case LiveEventType.MessageDeleted: {
            const { id } = event.data;
            setMessages((prevState) =>
              prevState.filter((item) => item.id !== id)
            );
            break;
          }
          case LiveEventType.MessageReaction: {
            const { id, reaction } = event.data;
            setMessages((prevState) =>
              prevState.map((item) =>
                item.id === id
                  ? { ...item, reaction: reaction ?? undefined }
                  : item
              )
            );
            break;
          }
          default:
        }
      }),
    [addMessage, friendId]
  );

  const loadOlder = useCallback(() => {
    const oldest = messages[messages.length - 1];

    if (!hasOlder.current || loadingOlder.current || !oldest) {
      return;
    }

    loadingOlder.current = true;
    getRequest<ResponseMessagesGetInterface>(
      `chats/${friendId}/messages?lastId=${oldest.id}`
    ).subscribe((response: ResponseMessagesGetInterface) => {
      loadingOlder.current = false;

      if (response?.status) {
        const data = response.data ?? [];

        setMessages((prevState) => {
          // A refresh reset the list meanwhile, this page no longer connects
          if (prevState[prevState.length - 1]?.id !== oldest.id) {
            return prevState;
          }

          // Safe in the updater, a rerun assigns the same value
          hasOlder.current = data.length >= PAGE_SIZE;

          return prevState.concat(
            data.filter((item) => !prevState.some(({ id }) => id === item.id))
          );
        });
      }
    });
  }, [friendId, messages]);

  const onChangeText = useCallback(
    (value: string) => {
      setMessage(value);
      onTyping(value);
    },
    [onTyping]
  );

  const onPressSend = useCallback(() => {
    const text = message.trim();
    if (!text) {
      return;
    }

    stopTyping();

    // Shown right away under a temporary id until the server returns it
    const tempId = -moment().valueOf();
    setMessages((prevState) => [
      {
        id: tempId,
        senderId: userId,
        type: MessageType.Message,
        message: text,
        time: moment().unix()
      },
      ...prevState
    ]);
    setMessage('');
    scrollToEnd();

    postRequest<ResponseMessagePostInterface, MessagePostInterface>(
      `chats/${friendId}/messages`,
      { message: text }
    ).subscribe((response: ResponseMessagePostInterface) => {
      const sent = response?.data;

      if (sent) {
        // A refresh or the live event may have brought it already
        setMessages((prevState) =>
          prevState.some((item) => item.id === sent.id)
            ? prevState.filter((item) => item.id !== tempId)
            : prevState.map((item) => (item.id === tempId ? sent : item))
        );
        return;
      }

      setMessages((prevState) =>
        prevState.filter((item) => item.id !== tempId)
      );
      setMessage((value) => value || text);
      Alert.alert('Failed to send. Please try again.');
    });
  }, [friendId, message, stopTyping, userId]);

  const sendReaction = useCallback(
    (reaction: string, messageId: number) => {
      // Picking the current reaction again removes it
      const current = messages.find((item) => item.id === messageId)?.reaction;
      const value = current === reaction ? null : reaction;

      // Show the reaction right away, a failure reloads the server state
      setMessages((prevState) =>
        prevState.map((item) =>
          item.id === messageId
            ? { ...item, reaction: value ?? undefined }
            : item
        )
      );

      putRequest<ResponseInterface, ReactionPostInterface>(
        `chats/messages/${messageId}/reaction`,
        { reaction: value }
      ).subscribe((response: ResponseInterface) => {
        if (!response?.status) {
          loadMessages();
        }
      });
    },
    [loadMessages, messages]
  );

  const sendSupport = useCallback((emotionId: number) => {
    const setSupported = (supported: boolean) =>
      setMessages((prevState) =>
        prevState.map((item) =>
          item.id === emotionId
            ? { ...item, reaction: supported ? SUPPORT_REACTION : undefined }
            : item
        )
      );

    // Shown as supported right away, which also hides the button so it
    // can't be sent twice, a failure takes it back
    supportingIds.current.add(emotionId);
    setSupported(true);

    putRequest<ResponseInterface, ReactionPostInterface>(
      `chats/messages/${emotionId}/reaction`,
      { reaction: SUPPORT_REACTION }
    ).subscribe((response: ResponseInterface) => {
      supportingIds.current.delete(emotionId);

      if (!response?.status) {
        setSupported(false);
        Alert.alert('Failed to send support. Please try again.');
      }
    });
  }, []);

  const deleteMessage = useCallback(
    (messageId: number) => {
      const deleted = messages.find((item) => item.id === messageId);
      // Still being sent, there is nothing to delete yet
      if (!deleted || messageId < 0) {
        return;
      }

      Alert.alert('Delete message?', 'It will be deleted for both of you.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMessages((prevState) =>
              prevState.filter((item) => item.id !== messageId)
            );

            deleteRequest<ResponseInterface>(
              `chats/messages/${messageId}`
            ).subscribe((response: ResponseInterface) => {
              if (!response?.status) {
                // Back in its place, newest first by id
                setMessages((prevState) => {
                  // A refresh may have brought it back already
                  if (prevState.some((item) => item.id === messageId)) {
                    return prevState;
                  }

                  const index = prevState.findIndex(
                    (item) => item.id > 0 && item.id < messageId
                  );
                  return index < 0
                    ? prevState.concat(deleted)
                    : [
                        ...prevState.slice(0, index),
                        deleted,
                        ...prevState.slice(index)
                      ];
                });
                Alert.alert('Failed to delete. Please try again.');
              }
            });
          }
        }
      ]);
    },
    [messages]
  );

  return (
    <View style={[ChatScreenStyle.container, { paddingTop: top }]}>
      <ChatHeader
        chatUserId={friendId}
        username={friend.username ?? ''}
        name={friend.name ?? ''}
        profilePhoto={friend.profilePhoto}
      />
      <Animated.View style={[ChatScreenStyle.chatView, chatViewStyle]}>
        <ChatList
          listRef={listRef}
          messages={messages}
          lastReadId={lastReadId}
          typing={typing}
          onSelectReaction={sendReaction}
          onPressSupport={sendSupport}
          onDeleteMessage={deleteMessage}
          onLoadOlder={loadOlder}
          name={friend.name ?? ''}
          profilePhoto={friend.profilePhoto}
        />
        <ChatInput
          message={message}
          onChangeText={onChangeText}
          onPressSend={onPressSend}
          inputRef={inputRef}
          onFocus={scrollToEnd}
        />
      </Animated.View>
    </View>
  );
};
