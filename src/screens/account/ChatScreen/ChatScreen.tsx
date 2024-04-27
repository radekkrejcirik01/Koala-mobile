import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import moment from 'moment';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import fs from 'react-native-fs';
import { ChatScreenHeader } from '@components/chat/ChatScreenHeader/ChatScreenHeader';
import { ChatScreenStyle } from '@screens/account/ChatScreen/ChatScreen.style';
import { ChatScreenProps } from '@screens/account/ChatScreen/ChatScreen.props';
import {
    getRequest,
    postRequest,
    putRequest
} from '@utils/Axios/Axios.service';
import {
    ResponseConversationGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { MessageNotificationPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { ConversationInterface } from '@interfaces/general.interface';
import { ChatList } from '@components/chat/ChatList/ChatList';
import { ChatInput } from '@components/chat/ChatInput/ChatInput';

export const ChatScreen = ({ route }: ChatScreenProps): React.JSX.Element => {
    const { id, senderId, name, username, conversationId, isStatusReply } =
        route.params;

    const {
        id: userId,
        name: userName,
        username: userUsername
    } = useSelector((state: ReducerProps) => state.user.user);

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>('');
    const [conversation, setConversation] = useState<ConversationInterface[]>(
        []
    );
    const [reactionButtons, setReactionButtons] = useState<boolean>(false);
    const [replyMessage, setReplyMessage] = useState<string>('');
    const [audioRecord, setAudioRecord] = useState<string>('');

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

            const receivedMessages = data?.filter(
                (e: ConversationInterface) => e?.sender === username
            );

            return (
                data[0]?.sender === username && receivedMessages?.length === 1
            );
        },
        [isStatusReply, username]
    );

    const updateSeenNotification = useCallback(() => {
        putRequest<ResponseInterface, never>(
            `notification/${conversationId || id}`
        ).subscribe();
    }, [conversationId, id]);

    const getConversation = useCallback(
        (scroll = true) => {
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
                }
            });
        },
        [checkReactionButtons, conversationId, id, updateSeenNotification]
    );

    useEffect(() => {
        getConversation();
    }, [getConversation]);

    useEffect(() => {
        if (reactionButtons) {
            inputRef.current.focus();
        }
    }, [reactionButtons]);

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

    const send = useCallback(
        async (text?: string) => {
            setConversation((prevState) =>
                prevState.concat({
                    id: prevState[prevState?.length - 1].id + 1,
                    sender: userUsername,
                    receiver: '',
                    message: text || message,
                    time: moment().unix(),
                    replyMessage
                })
            );

            let base64Buffer;
            if (audioRecord) {
                base64Buffer = await fs.readFile(audioRecord, 'base64');
            }

            postRequest<ResponseInterface, MessageNotificationPostInterface>(
                'message-notification',
                {
                    senderId: userId,
                    receiverId: senderId,
                    receiver: username,
                    name: userName,
                    message: text || message,
                    conversationId: conversationId || id,
                    replyMessage,
                    audioBuffer: text ? '' : base64Buffer
                }
            ).subscribe();
        },
        [
            audioRecord,
            conversationId,
            id,
            message,
            replyMessage,
            senderId,
            userId,
            userName,
            userUsername,
            username
        ]
    );

    const onMessageLongPress = useCallback((item: ConversationInterface) => {
        inputRef.current.focus();
        setReplyMessage(item.message);

        ReactNativeHapticFeedback.trigger('impactLight');
    }, []);

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
            <ChatScreenHeader name={name} userId={senderId} />
            <ChatList
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
