import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusReplyModalScreenProps } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen.props';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { StatusReplyModalScreenStyle } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen.style';

export const StatusReplyModalScreen = ({
    item,
    onPressReply
}: StatusReplyModalScreenProps): React.JSX.Element => {
    const [message, setMessage] = useState<string>();

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
                        placeholder="Message..."
                        selectionColor={COLORS.BUTTON_BLUE}
                        style={StatusReplyModalScreenStyle.input}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!message}
                        hitSlop={10}
                        onPress={() => onPressReply(message)}
                        style={StatusReplyModalScreenStyle.sendIconView}
                    >
                        <Icon
                            name={IconEnum.SEND}
                            size={22}
                            style={StatusReplyModalScreenStyle.sendIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
