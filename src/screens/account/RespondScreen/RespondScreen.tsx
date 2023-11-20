import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
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
import { ReactionButtons } from '@components/respond/ReactionButtons/ReactionButtons';
import { InboundMessageItem } from '@components/respond/InboundMessageItem/InboundMessageItem';
import { OutboundMessageItem } from '@components/respond/OutboundMessageItem/OutboundMessageItem';

export const RespondScreen = ({
    route
}: RespondScreenProps): React.JSX.Element => {
    const { id, name, username, conversationId } = route.params;

    const { name: userName, username: userUsername } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top, bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>();
    const [conversation, setConversation] = useState<ConversationInterface[]>(
        []
    );
    const [reactionButtons, setReactionButtons] = useState<boolean>(false);

    const scrollViewRef = useRef(null);

    const scrollToEnd = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 50);
    };

    // Helper function to check reaction buttons visibility
    // Return true when first messages is inbound and number of inbound messages is 1
    const showReactionButtons = useCallback(
        (data: ConversationInterface[]) => {
            const receivedMessages = data?.filter(
                (e: ConversationInterface) => e?.sender === username
            );

            return (
                data[0]?.sender === username && receivedMessages?.length === 1
            );
        },
        [username]
    );

    const getConversation = useCallback(() => {
        getRequest<ResponseConversationGetInterface>(
            `conversation/${conversationId || id}`
        ).subscribe((response: ResponseConversationGetInterface) => {
            if (response?.status && !!response?.data?.length) {
                const data = response?.data;

                setConversation(data);
                setReactionButtons(showReactionButtons(data));

                // Scroll to bottom when conversation has more than 15 messages
                if (data?.length >= 10) {
                    scrollToEnd();
                }
            }
        });
    }, [conversationId, id, showReactionButtons]);

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
                    time: moment().unix()
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

    const onPressReaction = useCallback(
        (value: string) => {
            send(value);
        },
        [send]
    );

    const onPressSend = useCallback(() => {
        send();
        setMessage('');

        scrollToEnd();
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
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={RespondScreenStyle.scrollViewContainer}
            >
                {conversation?.map((value) =>
                    isInbound(value.sender) ? (
                        <InboundMessageItem key={value.id} time={value.time}>
                            {value.message}
                        </InboundMessageItem>
                    ) : (
                        <OutboundMessageItem key={value.id} time={value.time}>
                            {value.message}
                        </OutboundMessageItem>
                    )
                )}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            >
                {reactionButtons && (
                    <ReactionButtons onPressReaction={onPressReaction} />
                )}
                <View style={RespondScreenStyle.inputContainer}>
                    <View style={RespondScreenStyle.inputView}>
                        <TextInput
                            autoCorrect={false}
                            multiline
                            onFocus={scrollToEnd}
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
                            onPress={onPressSend}
                        >
                            <Icon name={IconEnum.SEND} size={27} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
