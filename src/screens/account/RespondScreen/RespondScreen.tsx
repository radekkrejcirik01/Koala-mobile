import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { RespondScreenHeader } from '@components/respond/RespondScreenHeader/RespondScreenHeader';
import { RespondScreenStyle } from '@screens/account/RespondScreen/RespondScreen.style';
import { RespondScreenProps } from '@screens/account/RespondScreen/RespondScreen.props';
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
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ConversationInterface } from '@interfaces/general.interface';
import { ReactionButtons } from '@components/respond/ReactionButtons/ReactionButtons';
import { InboundMessageItem } from '@components/respond/InboundMessageItem/InboundMessageItem';
import { OutboundMessageItem } from '@components/respond/OutboundMessageItem/OutboundMessageItem';

export const RespondScreen = ({
    route
}: RespondScreenProps): React.JSX.Element => {
    const { id, senderId, name, username, conversationId, isStatusReply } =
        route.params;

    const {
        id: userId,
        name: userName,
        username: userUsername
    } = useSelector((state: ReducerProps) => state.user.user);

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>();
    const [conversation, setConversation] = useState<ConversationInterface[]>(
        []
    );
    const [reactionButtons, setReactionButtons] = useState<boolean>(false);
    const [replyMessage, setReplyMessage] = useState<string>();

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

    const getConversation = useCallback(() => {
        getRequest<ResponseConversationGetInterface>(
            `conversation/${conversationId || id}`
        ).subscribe((response: ResponseConversationGetInterface) => {
            if (response?.status && !!response?.data?.length) {
                const data = response?.data;

                setConversation(data);
                setReactionButtons(checkReactionButtons(data));

                updateSeenNotification();

                // Scroll to bottom when conversation has more than 10 messages
                if (data?.length >= 10) {
                    scrollToEnd();
                }
            }
        });
    }, [checkReactionButtons, conversationId, id, updateSeenNotification]);

    useEffect(() => {
        getConversation();
    }, [getConversation]);

    const send = useCallback(
        (text?: string) => {
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

            postRequest<ResponseInterface, MessageNotificationPostInterface>(
                'message-notification',
                {
                    senderId: userId,
                    receiverId: senderId,
                    receiver: username,
                    name: userName,
                    message: text || message,
                    conversationId: conversationId || id,
                    replyMessage
                }
            ).subscribe();
        },
        [
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

    const isInbound = useCallback(
        (sender: string): boolean => sender === username,
        [username]
    );

    const onMessageLongPress = useCallback((item: ConversationInterface) => {
        inputRef.current.focus();
        setReplyMessage(item.message);

        ReactNativeHapticFeedback.trigger('impactMedium');
    }, []);

    const onPressReaction = useCallback(
        (value: string) => {
            send(value);
        },
        [send]
    );

    const onPressSend = useCallback(() => {
        send();
        setMessage('');
        setReplyMessage('');

        scrollToEnd();
    }, [send]);

    return (
        <View
            style={[
                RespondScreenStyle.container,
                { paddingTop: top || 10, paddingBottom: bottom || 5 }
            ]}
        >
            <RespondScreenHeader name={name} userId={senderId} />
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={RespondScreenStyle.scrollViewContainer}
            >
                {conversation?.map((value) =>
                    isInbound(value.sender) ? (
                        <InboundMessageItem
                            key={value.id}
                            onLongPress={() => onMessageLongPress(value)}
                            time={value.time}
                            replyMessage={value?.replyMessage}
                        >
                            {value.message}
                        </InboundMessageItem>
                    ) : (
                        <OutboundMessageItem
                            onLongPress={() => onMessageLongPress(value)}
                            key={value.id}
                            time={value.time}
                            replyMessage={value?.replyMessage}
                        >
                            {value.message}
                        </OutboundMessageItem>
                    )
                )}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            >
                {!!replyMessage && (
                    <View style={RespondScreenStyle.replyMessageContainer}>
                        <View style={RespondScreenStyle.replyingToContainer}>
                            <Text style={RespondScreenStyle.replyingToText}>
                                Replying to
                            </Text>
                            <TouchableOpacity
                                onPress={() => setReplyMessage('')}
                                style={RespondScreenStyle.dismissButtonView}
                            >
                                <Icon name={IconEnum.CLEAN} size={20} />
                            </TouchableOpacity>
                        </View>
                        <Text style={RespondScreenStyle.replyMessageText}>
                            {replyMessage}
                        </Text>
                    </View>
                )}
                <View style={RespondScreenStyle.inputContainer}>
                    <View style={RespondScreenStyle.inputView}>
                        <TextInput
                            ref={inputRef}
                            autoCorrect={false}
                            multiline
                            onFocus={scrollToEnd}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Message"
                            selectionColor={COLORS.BUTTON_BLUE}
                            style={RespondScreenStyle.input}
                        />
                        <TouchableOpacity
                            activeOpacity={0.9}
                            disabled={!message}
                            hitSlop={10}
                            onPress={onPressSend}
                            style={RespondScreenStyle.sendButtonView}
                        >
                            <Icon
                                name={IconEnum.SEND}
                                size={20}
                                style={RespondScreenStyle.sendButtonIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            {reactionButtons && (
                <ReactionButtons onPressReaction={onPressReaction} />
            )}
        </View>
    );
};
