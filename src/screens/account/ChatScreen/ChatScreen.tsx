import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import moment from 'moment';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import fs from 'react-native-fs';
import { useAppState } from '@hooks/useAppState';
import { ChatScreenHeader } from '@components/chat/ChatScreenHeader/ChatScreenHeader';
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
import { MessagePostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { ConversationInterface } from '@interfaces/general.interface';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { ChatInput } from '@components/chat/ChatInput/ChatInput';

export const ChatScreen = ({ route }: ChatScreenProps): React.JSX.Element => {
    const { id, senderId, name, username, conversationId, isStatusReply } =
        route.params;

    const { id: userId } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>('');
    const [conversation, setConversation] = useState<ConversationInterface[]>(
        []
    );
    const [reactionButtons, setReactionButtons] = useState<boolean>(false);
    const [replyMessage, setReplyMessage] = useState<string>('');
    const [audioRecord, setAudioRecord] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>();

    const scrollViewRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToEnd = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 50);
    };

    // Helper function to check reaction buttons visibility
    // Return true when first messages is inbound and number of inbound messages is 1
    const checkReactionButtons = useCallback(
        (data: ConversationInterface[]) => {
            if (isStatusReply) {
                return false;
            }
            if (data[0]?.senderId === userId) {
                return false;
            }

            const receivedMessages = data?.filter(
                (e: ConversationInterface) => e?.senderId !== userId
            );
            return receivedMessages?.length === 1;
        },
        [isStatusReply, userId]
    );

    const updateSeenNotification = useCallback(() => {
        putRequest<ResponseInterface, never>(
            `notification/${conversationId || id}`
        ).subscribe();
    }, [conversationId, id]);

    const getConversation = useCallback(
        (scroll = true) => {
            setLoaded(false);
            getRequest<ResponseConversationGetInterface>(
                `conversation/${conversationId || id}`
            ).subscribe((response: ResponseConversationGetInterface) => {
                if (response?.status && !!response?.data?.length) {
                    const data = response?.data;

                    setConversation(data);
                    setReactionButtons(checkReactionButtons(data));

                    updateSeenNotification();

                    // Scroll to bottom when conversation has more than 10 messages
                    if (data?.length >= 10 && scroll) {
                        scrollToEnd();
                    }

                    setLoaded(true);
                }
            });
        },
        [checkReactionButtons, conversationId, id, updateSeenNotification]
    );

    useEffect(() => {
        getConversation();
    }, [getConversation]);

    useEffect(
        () =>
            // On new message
            messaging().onMessage(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                        getConversation(false);
                    }
                }
            ),
        [getConversation]
    );

    useAppState(() => getConversation(false));

    const send = useCallback(
        async (text?: string) => {
            setConversation((prevState) =>
                prevState.concat({
                    id: prevState[prevState?.length - 1].id + 1,
                    senderId: userId,
                    message: text || message,
                    time: moment().unix(),
                    replyMessage,
                    audioMessage: audioRecord
                })
            );

            let base64Buffer;
            if (audioRecord) {
                base64Buffer = await fs.readFile(audioRecord, 'base64');
            }

            setLoaded(false);
            postRequest<ResponseInterface, MessagePostInterface>('message', {
                conversationId: conversationId || id,
                receiverId: senderId,
                message: text || message,
                replyMessage,
                audioBuffer: text ? '' : base64Buffer
            }).subscribe((response) => {
                if (response?.status) {
                    getConversation(false);
                }
            });
        },
        [
            audioRecord,
            conversationId,
            getConversation,
            id,
            message,
            replyMessage,
            senderId,
            userId
        ]
    );

    const deleteMessage = useCallback(
        (messageId: number) => {
            if (!loaded) {
                return;
            }

            deleteRequest<ResponseInterface>(`message/${messageId}`).subscribe(
                (response: ResponseInterface) => {
                    if (response?.status) {
                        getConversation(false);
                    }
                }
            );
        },
        [getConversation, loaded]
    );

    const onMessageLongPress = useCallback(
        (item: ConversationInterface) => {
            ReactNativeHapticFeedback.trigger('impactLight');

            if (item?.senderId === userId) {
                Alert.alert(item.message || '🎤 Voice message', '', [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete for everybody',
                        onPress: () => deleteMessage(item.id),
                        style: 'destructive'
                    }
                ]);
            } else {
                inputRef.current.focus();
                setReplyMessage(item.message);
            }
        },
        [deleteMessage, userId]
    );

    const onPressReaction = useCallback(
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

    return (
        <View
            style={[
                ChatScreenStyle.container,
                { paddingTop: top || 10, paddingBottom: bottom || 5 }
            ]}
        >
            <ChatScreenHeader id={senderId} username={username} name={name} />
            <ChatList
                name={name}
                conversation={conversation}
                onMessageLongPress={onMessageLongPress}
            />
            <ChatInput
                message={message}
                onChangeText={setMessage}
                onPressSend={onPressSend}
                onPressReaction={onPressReaction}
                onAudioRecord={setAudioRecord}
                replyMessage={replyMessage}
                inputRef={inputRef}
                onFocus={scrollToEnd}
                onDismissReply={() => setReplyMessage('')}
                showReactionsButtons={!!reactionButtons}
            />
        </View>
    );
};
