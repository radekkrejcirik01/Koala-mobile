import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { FlashListRef } from '@shopify/flash-list';
import { useTypingSender } from '@hooks/useTypingSender';
import { useNavigation } from '@hooks/useNavigation';
import { ChatHeader } from '@components/chat/ChatHeader/ChatHeader';
import { useChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from '@utils/Axios/Axios.service';
import { NotificationsService } from '@utils/general/NotificationsService';
import { LiveService } from '@utils/general/LiveService';
import { ChatThemeCache } from '@utils/general/ChatThemeCache';
import { chatDraft, DraftCache } from '@utils/general/DraftCache';
import {
  ResponseChatSettingsGetInterface,
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
import {
  ChatSettingsInterface,
  MessageInterface,
  ReplyInterface
} from '@interfaces/general.interface';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { ChatInput } from '@components/chat/ChatInput/ChatInput';
import { MessageType } from '@enums/MessageType';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';
import { mergeLatestMessages } from '@functions/mergeLatestMessages';
import { getReplyText } from '@functions/getReplyText';
import { SUPPORT_REACTION } from '@constants/SUPPORT_REACTION';
import { LiveEventType } from '@enums/LiveEventType';
import { getChatBackground, getChatTheme } from '@constants/CHAT_THEMES';
import { useTheme } from '@hooks/useTheme';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

// Gap between the input and the open keyboard
const KEYBOARD_INPUT_GAP = 5;

// How long a message opened from search stays highlighted
const HIGHLIGHT_DURATION = 2000;

// The quote of a message, as the server sends it on replies
const toReply = ({
  id,
  senderId,
  type,
  message,
  emotion
}: MessageInterface): ReplyInterface => ({
  id,
  senderId,
  type,
  message,
  emotion
});

export const ChatScreen = ({ route }: ChatScreenProps): React.JSX.Element => {
  const ChatScreenStyle = useChatScreenStyle();
  const { isDark } = useTheme();
  const { id: friendId, jump } = route.params;

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
  // What was written before leaving the chat
  const [message, setMessage] = useState<string>(() =>
    DraftCache.get(chatDraft(friendId))
  );
  // Newest first, the list is inverted
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  // Read position from before the chat was opened, kept while it stays open
  // as later loads already return the position moved by markAsRead
  const [lastReadId, setLastReadId] = useState<number>();
  // Nickname and theme, undefined until loaded
  const [settings, setSettings] = useState<ChatSettingsInterface>();
  // Opened at an older message, newer ones load when scrolling down
  const [atLatest, setAtLatest] = useState<boolean>(!jump);
  const [highlightId, setHighlightId] = useState<number>();
  // The message quoted by the one being written
  const [replyTo, setReplyTo] = useState<MessageInterface>();

  const hasOlder = useRef<boolean>(false);
  const lastReadLoaded = useRef<boolean>(false);
  const loadingOlder = useRef<boolean>(false);
  const loadingNewer = useRef<boolean>(false);
  // Read in callbacks that shouldn't change with it
  const atLatestRef = useRef<boolean>(!jump);
  // Emotions whose support is still being sent, a refresh keeps them supported
  const supportingIds = useRef<Set<number>>(new Set());

  const highlightTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const listRef = useRef<FlashListRef<MessageInterface>>(null);
  const inputRef = useRef<TextInput>(null);

  // The server ignores typing to an ex-friend
  const { onTyping, stopTyping } = useTypingSender(friendId);

  // Changed in the chat settings, reloaded when coming back from them
  const loadSettings = useCallback(() => {
    getRequest<ResponseChatSettingsGetInterface>(
      `chats/${friendId}/settings`
    ).subscribe((response: ResponseChatSettingsGetInterface) => {
      if (response?.status) {
        setSettings(response.data ?? {});
        ChatThemeCache.set(friendId, response.data?.theme);
      }
    });
  }, [friendId]);

  const { navigateTo } = useNavigation(
    RootStackNavigatorEnum.AccountStack,
    loadSettings
  );

  const name =
    (settings ? settings.nickname : friend.nickname) || friend.name || '';
  // The cached theme until the settings load, so the chat doesn't flicker
  const chatTheme = getChatTheme(
    settings ? settings.theme : ChatThemeCache.get(friendId)
  );
  const chatBackground = getChatBackground(chatTheme, isDark);

  // Kept until it's sent, sending empties it
  useEffect(() => {
    DraftCache.set(chatDraft(friendId), message);
  }, [friendId, message]);

  const setLatest = useCallback((value: boolean) => {
    atLatestRef.current = value;
    setAtLatest(value);
  }, []);

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
    // Opened at an older message, the newest page doesn't connect to it
    if (!atLatestRef.current) {
      return;
    }

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

  // Briefly marks the message opened from search, shared emotions or a quote
  const highlight = useCallback((messageId: number) => {
    setHighlightId(messageId);
    clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(
      () => setHighlightId(undefined),
      HIGHLIGHT_DURATION
    );
  }, []);

  useEffect(() => () => clearTimeout(highlightTimer.current), []);

  // Shows the loaded messages around one, newest first, scrolled to it
  const showAround = useCallback(
    (messageId: number, around: MessageInterface[]) => {
      // Newest first, the messages before it are newer
      const index = Math.max(
        around.findIndex((item) => item.id === messageId),
        0
      );
      hasOlder.current = around.length - index - 1 >= PAGE_SIZE;
      setLatest(index < PAGE_SIZE);
      setMessages(around);
      highlight(messageId);
      markAsRead();

      setTimeout(() => {
        listRef?.current?.scrollToIndex({
          index,
          viewPosition: 0.5,
          animated: false
        });
      }, 100);
    },
    [highlight, markAsRead, setLatest]
  );

  // Opened at a message from search or shared emotions
  useEffect(() => {
    if (jump) {
      showAround(jump.id, jump.messages);
    }
  }, [jump, showAround]);

  // Tapped the quote on a reply, scrolls to the original when it's loaded,
  // otherwise opens the chat around it
  const goToMessage = useCallback(
    (messageId: number) => {
      const index = messages.findIndex((item) => item.id === messageId);
      if (index >= 0) {
        listRef?.current?.scrollToIndex({ index, viewPosition: 0.5 });
        highlight(messageId);
        return;
      }

      getRequest<ResponseMessagesGetInterface>(
        `chats/${friendId}/messages?aroundId=${messageId}`
      ).subscribe((response: ResponseMessagesGetInterface) => {
        if (!response?.data?.length) {
          Alert.alert('This message is no longer available');
          return;
        }

        showAround(messageId, response.data);
      });
    },
    [friendId, highlight, messages, showAround]
  );

  const jumpToLatest = useCallback(() => {
    setLatest(true);
    setHighlightId(undefined);
    // Messages still being sent stay, the newest page goes under them
    setMessages((prevState) => prevState.filter((item) => item.id < 0));
    loadMessages();
    scrollToEnd();
  }, [loadMessages, setLatest]);

  // Replies to it stay with their quote marked as deleted, and it can't be
  // quoted anymore
  const removeMessage = useCallback((messageId: number) => {
    setMessages((prevState) =>
      prevState
        .filter((item) => item.id !== messageId)
        .map((item) =>
          item.replyTo?.id === messageId
            ? { ...item, replyTo: { id: messageId, deleted: true } }
            : item
        )
    );
    setReplyTo((value) => (value?.id === messageId ? undefined : value));
  }, []);

  // Changes in this chat arrive live, from the friend and the user's devices
  useEffect(
    () =>
      LiveService.subscribe((event) => {
        if (!('friendId' in event.data) || event.data.friendId !== friendId) {
          return;
        }

        switch (event.type) {
          case LiveEventType.MessageNew:
            // Opened at an older message, it waits behind Jump to latest
            if (atLatestRef.current) {
              addMessage(event.data.message);
            }
            break;
          case LiveEventType.MessageDeleted:
            removeMessage(event.data.id);
            break;
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
    [addMessage, friendId, removeMessage]
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

  // Opened at an older message, scrolling down loads the newer ones
  const loadNewer = useCallback(() => {
    const newest = messages.find((item) => item.id > 0);

    if (atLatestRef.current || loadingNewer.current || !newest) {
      return;
    }

    loadingNewer.current = true;
    getRequest<ResponseMessagesGetInterface>(
      `chats/${friendId}/messages?firstId=${newest.id}`
    ).subscribe((response: ResponseMessagesGetInterface) => {
      loadingNewer.current = false;

      if (response?.status) {
        const data = response.data ?? [];

        setMessages((prevState) => {
          // Jumped elsewhere meanwhile, this page no longer connects
          if (prevState.find((item) => item.id > 0)?.id !== newest.id) {
            return prevState;
          }

          return data
            .filter((item) => !prevState.some(({ id }) => id === item.id))
            .concat(prevState);
        });

        if (data.length < PAGE_SIZE) {
          setLatest(true);
        }
      }
    });
  }, [friendId, messages, setLatest]);

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

    const quoted = replyTo;

    // Sent from an older part of the chat, it shows under the newest messages
    if (!atLatestRef.current) {
      jumpToLatest();
    }

    // Shown right away under a temporary id until the server returns it
    const tempId = -moment().valueOf();
    setMessages((prevState) => [
      {
        id: tempId,
        senderId: userId,
        type: MessageType.Message,
        message: text,
        ...(quoted && { replyTo: toReply(quoted) }),
        time: moment().unix()
      },
      ...prevState
    ]);
    setMessage('');
    setReplyTo(undefined);
    scrollToEnd();

    postRequest<ResponseMessagePostInterface, MessagePostInterface>(
      `chats/${friendId}/messages`,
      { message: text, ...(quoted && { replyToId: quoted.id }) }
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
      setReplyTo((value) => value ?? quoted);
      Alert.alert('Failed to send. Please try again.');
    });
  }, [friendId, jumpToLatest, message, replyTo, stopTyping, userId]);

  const startReply = useCallback(
    (messageId: number) => {
      const quoted = messages.find((item) => item.id === messageId);
      if (quoted && messageId > 0) {
        setReplyTo(quoted);
        inputRef.current?.focus();
      }
    },
    [messages]
  );

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
              if (response?.status) {
                removeMessage(messageId);
              } else {
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
    [messages, removeMessage]
  );

  return (
    <View
      style={[
        ChatScreenStyle.container,
        { paddingTop: top },
        !!chatBackground && { backgroundColor: chatBackground }
      ]}
    >
      <ChatHeader
        chatUserId={friendId}
        username={friend.username ?? ''}
        name={name}
        profilePhoto={friend.profilePhoto}
        onPress={
          friend.name
            ? () =>
                navigateTo(AccountStackNavigatorEnum.ChatSettingsScreen, {
                  friend: {
                    id: friendId,
                    name: friend.name,
                    username: friend.username,
                    profilePhoto: friend.profilePhoto
                  }
                })
            : undefined
        }
      />
      <Animated.View style={[ChatScreenStyle.chatView, chatViewStyle]}>
        <View style={ChatScreenStyle.chatView}>
          <ChatList
            listRef={listRef}
            messages={messages}
            lastReadId={lastReadId}
            highlightId={highlightId}
            bubbleColor={chatTheme.bubble}
            backgroundColor={chatBackground}
            // Newer messages show only once the newest ones are loaded
            typing={typing && atLatest}
            onSelectReaction={sendReaction}
            onPressSupport={sendSupport}
            onDeleteMessage={deleteMessage}
            onReply={startReply}
            onPressReply={goToMessage}
            onLoadOlder={loadOlder}
            onLoadNewer={loadNewer}
            name={name}
            profilePhoto={friend.profilePhoto}
          />
          {!atLatest && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={jumpToLatest}
              accessibilityLabel="Jump to latest"
              style={ChatScreenStyle.latestButton}
            >
              <Text style={ChatScreenStyle.latestText}>↓</Text>
            </TouchableOpacity>
          )}
        </View>
        <ChatInput
          message={message}
          onChangeText={onChangeText}
          onPressSend={onPressSend}
          inputRef={inputRef}
          onFocus={scrollToEnd}
          backgroundColor={chatBackground}
          sendButtonColor={chatTheme.bubble}
          reply={
            replyTo && {
              name: replyTo.senderId === userId ? 'yourself' : name,
              text: getReplyText(toReply(replyTo))
            }
          }
          onCancelReply={() => setReplyTo(undefined)}
        />
      </Animated.View>
    </View>
  );
};
