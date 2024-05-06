import React, { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { StatusReplyMessagePostInterface } from '@interfaces/post/Post.interface';
import { StatusReplyModalScreenProps } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen.props';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { StatusReplyModalScreenStyle } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen.style';

export const StatusReplyModalScreen = ({
    item
}: StatusReplyModalScreenProps): React.JSX.Element => {
    const [message, setMessage] = useState<string>();
    const [sent, setSent] = useState<boolean>(false);

    const reply = useCallback(() => {
        postRequest<ResponseInterface, StatusReplyMessagePostInterface>(
            'status-reply-message',
            {
                receiverId: item.userId,
                message,
                replyExpression: item.expression
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSent(true);
            }
        });
    }, [item.expression, item.userId, message]);

    return (
        <View style={StatusReplyModalScreenStyle.container}>
            <Text style={StatusReplyModalScreenStyle.titleText}>
                {`Replying to ${item.name}'s ${item.expression}`}
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
                    {sent ? (
                        <Text style={StatusReplyModalScreenStyle.sentText}>
                            ✅
                        </Text>
                    ) : (
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
                    )}
                </View>
            </View>
        </View>
    );
};
