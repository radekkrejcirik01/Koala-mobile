import React, { useCallback, useEffect, useState } from 'react';
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

export const RespondScreen = ({ route }: RespondScreenProps): JSX.Element => {
    const { id, name, username, conversationId } = route.params;

    const { name: userName, username: userUsername } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>();
    const [conversation, setConversation] = useState<ConversationInterface[]>();

    const getConversation = useCallback(() => {
        getRequest<ResponseConversationGetInterface>(
            `conversation/${conversationId || id}`
        ).subscribe((response: ResponseConversationGetInterface) => {
            if (response?.status) {
                setConversation(response?.data);
            }
        });
    }, [conversationId, id]);

    const updateSeenNotification = useCallback(() => {
        putRequest<ResponseInterface, never>(`notification/${id}`).subscribe();
    }, [id]);

    useEffect(() => {
        getConversation();
        updateSeenNotification();
    }, [getConversation, updateSeenNotification]);

    const send = useCallback(
        (text?: string) => {
            // Clear only if sending message
            if (!text) {
                setMessage('');
            }

            setConversation((prevState) =>
                prevState.concat({
                    id: prevState[prevState?.length - 1].id + 1,
                    sender: userUsername,
                    receiver: '',
                    message: text || message
                })
            );

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

    const onPressSupport = useCallback(() => {
        send(
            `Sending support ❤️ I am always here, you can tell me more if you want`
        );
    }, [send]);

    const onPressHeart = useCallback(() => {
        send('❤️');
    }, [send]);

    return (
        <View
            style={[
                RespondScreenStyle.container,
                { paddingTop: top, paddingBottom: bottom + 5 }
            ]}
        >
            <RespondScreenHeader name={name} />
            <ScrollView
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
                {conversation?.length === 1 && (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onPressSupport}
                        style={RespondScreenStyle.supportView}
                    >
                        <Text style={RespondScreenStyle.supportText}>
                            {`Sending support ❤️\nI am always here, you can tell me more if you want`}
                        </Text>
                    </TouchableOpacity>
                )}
                <View style={RespondScreenStyle.inputContainer}>
                    <View style={RespondScreenStyle.inputView}>
                        <TextInput
                            autoCorrect={false}
                            multiline
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Message..."
                            selectionColor={COLORS.BUTTON_BLUE}
                            style={RespondScreenStyle.input}
                        />
                        <TouchableOpacity
                            disabled={!message}
                            onPress={() => send()}
                        >
                            <Icon name={IconEnum.SEND} size={26} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onPressHeart}
                        style={RespondScreenStyle.heartView}
                    >
                        <Text style={RespondScreenStyle.heartText}>❤️</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
