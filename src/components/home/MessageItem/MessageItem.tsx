import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MessageItemProps } from '@components/home/MessageItem/MessageItem.props';
import { MessageItemStyle } from '@components/home/MessageItem/MessageItem.style';

export const MessageItem = ({
    item,
    index,
    onPressMessage,
    onItemLongPress
}: MessageItemProps): JSX.Element => {
    const messageNumber = index + 1;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressMessage}
            onLongPress={onItemLongPress}
            delayLongPress={150}
            style={MessageItemStyle.buttonView}
        >
            <Text style={MessageItemStyle.numberText}>{messageNumber}</Text>
            <Text style={MessageItemStyle.messageText} numberOfLines={1}>
                {item.message}
            </Text>
            <Text style={MessageItemStyle.emojiText}>💬</Text>
        </TouchableOpacity>
    );
};
