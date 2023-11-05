import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
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

    const { name: userName } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>();
    const [conversation, setConversation] = useState<ConversationInterface[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);

    const getConversation = useCallback(() => {
        setLoading(true);

        getRequest<ResponseConversationGetInterface>(
            `conversation/${conversationId || id}`
        ).subscribe((response: ResponseConversationGetInterface) => {
            if (response?.status) {
                setConversation(response?.data);
                setLoading(false);
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

    const send = useCallback(() => {
        setSending(true);

        postRequest<ResponseInterface, MessageNotificationPostInterface>(
            'message-notification',
            {
                receiver: username,
                name: userName,
                message,
                conversationId: conversationId || id
            }
        ).subscribe((response: ResponseInterface) => {
            setSending(false);

            if (response?.status) {
                setMessage('');
                getConversation();
            }
        });
    }, [conversationId, getConversation, id, message, userName, username]);

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
                {loading ? (
                    <ActivityIndicator
                        color={COLORS.BUTTON_BLUE}
                        style={RespondScreenStyle.activityIndicator}
                    />
                ) : (
                    conversation?.map((value) => (
                        <Text
                            key={value.id}
                            style={
                                value?.sender === username
                                    ? RespondScreenStyle.inboundText
                                    : RespondScreenStyle.outboundText
                            }
                        >
                            {value?.message}
                        </Text>
                    ))
                )}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            >
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
                        {sending ? (
                            <ActivityIndicator color={COLORS.BUTTON_BLUE} />
                        ) : (
                            <TouchableOpacity
                                disabled={!message}
                                onPress={send}
                            >
                                <Icon name={IconEnum.SEND} size={26} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
