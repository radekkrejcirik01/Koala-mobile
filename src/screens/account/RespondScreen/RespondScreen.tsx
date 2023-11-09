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
import { RespondScreenHeader } from '@components/respond/RespondScreenHeader/RespondScreenHeader';
import { RespondScreenStyle } from '@screens/account/RespondScreen/RespondScreen.style';
import { RespondScreenProps } from '@screens/account/RespondScreen/RespondScreen.props';
import { getRequest, postRequest } from '@utils/Axios/Axios.service';
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
import { ResponsesButtons } from '@components/respond/ResponsesButtons/ResponsesButtons';

export const RespondScreen = ({ route }: RespondScreenProps): JSX.Element => {
    const { id, name, username, conversationId } = route.params;

    const { name: userName, username: userUsername } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>();
    const [conversation, setConversation] = useState<ConversationInterface[]>(
        []
    );

    const scrollViewRef = useRef(null);

    const scrollToEnd = (animated: boolean) => {
        scrollViewRef?.current?.scrollToEnd({ animated });
    };

    const getConversation = useCallback(() => {
        getRequest<ResponseConversationGetInterface>(
            `conversation/${conversationId || id}`
        ).subscribe((response: ResponseConversationGetInterface) => {
            if (response?.status) {
                setConversation(response?.data);
            }
        });
    }, [conversationId, id]);

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
                    message: text || message
                })
            );

            scrollToEnd(true);

            postRequest<ResponseInterface, MessageNotificationPostInterface>(
                'message-notification',
                {
                    receiver: username,
                    name: userName,
                    message: text || message,
                    conversationId: conversationId || id
                }
            ).subscribe();
        },
        [conversationId, id, message, userName, userUsername, username]
    );

    const isInbound = useCallback(
        (sender: string): boolean => sender === username,
        [username]
    );

    function isHeart(text: string): boolean {
        return text === '❤️';
    }

    const onPressResponseButton = useCallback(
        (value: string) => {
            send(value);
        },
        [send]
    );

    // Show response buttons only if number of received messages is 1
    // and first message is shared emotion from friend
    const showResponseButtons = useCallback((): boolean => {
        if (conversation?.length) {
            if (conversation[0]?.sender !== username) {
                return false;
            }

            const receivedMessages = conversation?.filter(
                (e: ConversationInterface) => e?.sender === username
            );
            return receivedMessages?.length === 1;
        }
        return false;
    }, [conversation, username]);

    return (
        <View
            style={[
                RespondScreenStyle.container,
                { paddingTop: top, paddingBottom: bottom + 5 }
            ]}
        >
            <RespondScreenHeader name={name} />
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={RespondScreenStyle.scrollViewContainer}
            >
                {conversation?.map((value) => (
                    <Text
                        key={value.id}
                        style={[
                            isInbound(value?.sender)
                                ? RespondScreenStyle.inboundText
                                : RespondScreenStyle.outboundText,
                            isHeart(value?.message) &&
                                RespondScreenStyle.heartMessageText
                        ]}
                    >
                        {value?.message}
                    </Text>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            >
                {showResponseButtons() && (
                    <ResponsesButtons onPressButton={onPressResponseButton} />
                )}
                <View style={RespondScreenStyle.inputContainer}>
                    <View style={RespondScreenStyle.inputView}>
                        <TextInput
                            autoCorrect={false}
                            multiline
                            onFocus={() => scrollToEnd(true)}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Message..."
                            selectionColor={COLORS.BUTTON_BLUE}
                            style={RespondScreenStyle.input}
                        />
                        <TouchableOpacity
                            activeOpacity={0.9}
                            disabled={!message}
                            hitSlop={10}
                            onPress={() => {
                                send();
                                setMessage('');
                            }}
                        >
                            <Icon name={IconEnum.SEND} size={27} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
