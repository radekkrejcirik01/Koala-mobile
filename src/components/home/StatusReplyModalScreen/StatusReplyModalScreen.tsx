import React, { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { StatusReplyNotificationPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { StatusReplyModalScreenProps } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen.props';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { StatusReplyModalScreenStyle } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen.style';

export const StatusReplyModalScreen = ({
    item
}: StatusReplyModalScreenProps): React.JSX.Element => {
    const { id: userId, name } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [message, setMessage] = useState<string>();

    const reply = useCallback(() => {
        postRequest<ResponseInterface, StatusReplyNotificationPostInterface>(
            'status-reply-notification',
            {
                senderId: userId,
                receiverId: item.userId,
                name,
                message,
                replyExpression: item.expression
            }
        ).subscribe();
    }, [item.expression, item.userId, message, name, userId]);

    return (
        <View style={StatusReplyModalScreenStyle.container}>
            <Text style={StatusReplyModalScreenStyle.titleText}>
                Replying to {item.expression}
            </Text>
            <View style={StatusReplyModalScreenStyle.inputContainer}>
                <View style={StatusReplyModalScreenStyle.inputView}>
                    <TextInput
                        autoFocus
                        autoCorrect={false}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Message"
                        selectionColor={COLORS.BUTTON_BLUE}
                        style={StatusReplyModalScreenStyle.input}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!message}
                        hitSlop={10}
                        onPress={() => {
                            reply();
                            setMessage('');
                        }}
                        style={StatusReplyModalScreenStyle.sendIconView}
                    >
                        <Icon
                            name={IconEnum.SEND}
                            size={20}
                            style={StatusReplyModalScreenStyle.sendIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
