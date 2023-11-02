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
import { postRequest, putRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { MessageNotificationPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const RespondScreen = ({ route }: RespondScreenProps): JSX.Element => {
    const { id, name, username, message } = route.params;

    const { name: userName } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top, bottom } = useSafeAreaInsets();

    const [respondMessage, setRespondMessage] = useState<string>();
    const [messages, setMessages] = useState<string[]>([]);
    const [sending, setSending] = useState<boolean>(false);

    const updateSeenNotification = useCallback(() => {
        putRequest<ResponseInterface, never>(`notification/${id}`).subscribe();
    }, [id]);

    useEffect(() => {
        updateSeenNotification();
    }, [updateSeenNotification]);

    const send = useCallback(() => {
        setSending(true);

        postRequest<ResponseInterface, MessageNotificationPostInterface>(
            'message-notification',
            {
                receiver: username,
                name: userName,
                message: respondMessage
            }
        ).subscribe((response: ResponseInterface) => {
            setSending(false);

            if (response?.status) {
                setMessages((prevState) => prevState.concat(respondMessage));
                setRespondMessage('');
            }
        });
    }, [respondMessage, userName, username]);

    return (
        <View
            style={[
                RespondScreenStyle.container,
                { paddingTop: top, paddingBottom: bottom + 10 }
            ]}
        >
            <RespondScreenHeader name={name} />
            <ScrollView
                contentContainerStyle={RespondScreenStyle.scrollViewContainer}
            >
                <Text style={RespondScreenStyle.messageText}>{message}</Text>
                {messages?.map((value, index) => (
                    <Text
                        key={value + index.toString()}
                        style={RespondScreenStyle.responseText}
                    >
                        {value}
                    </Text>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                keyboardVerticalOffset={10}
            >
                <View style={RespondScreenStyle.inputView}>
                    <TextInput
                        autoCorrect={false}
                        multiline
                        value={respondMessage}
                        onChangeText={setRespondMessage}
                        selectionColor={COLORS.BUTTON_BLUE}
                        style={RespondScreenStyle.input}
                    />
                    {sending ? (
                        <ActivityIndicator color={COLORS.BUTTON_BLUE} />
                    ) : (
                        <TouchableOpacity
                            disabled={!respondMessage}
                            onPress={send}
                        >
                            <Icon name={IconEnum.SEND} size={28} />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
