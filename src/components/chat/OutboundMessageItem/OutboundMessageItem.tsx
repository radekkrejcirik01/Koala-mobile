import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OutboundMessageItemProps } from '@components/chat/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/chat/OutboundMessageItem/OutboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { isTextEmoji } from '@functions/isTextEmoji';

export const OutboundMessageItem = ({
    children,
    onLongPress,
    replyMessage,
    audioMessage,
    isFirst,
    isLast,
    isSending
}: OutboundMessageItemProps): React.JSX.Element => {
    function getStatus(): string {
        if (isSending) {
            return 'Sending';
        }
        if (isLast) {
            return 'Delivered';
        }
        return '';
    }

    return (
        <View style={isFirst && OutboundMessageItemStyle.marginTop}>
            {!!replyMessage && (
                <View style={OutboundMessageItemStyle.replyMessageView}>
                    <Text style={OutboundMessageItemStyle.replyMessageText}>
                        {replyMessage}
                    </Text>
                </View>
            )}
            <View
                style={[
                    OutboundMessageItemStyle.container,
                    audioMessage && OutboundMessageItemStyle.audioMessage
                ]}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={120}
                    onLongPress={onLongPress}
                >
                    {audioMessage ? (
                        <AudioMessageItem audioMessage={audioMessage} />
                    ) : (
                        <Text
                            style={[
                                OutboundMessageItemStyle.messageText,
                                isTextEmoji(children) &&
                                    OutboundMessageItemStyle.largeText
                            ]}
                        >
                            {children}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
            {getStatus() && (
                <Text style={OutboundMessageItemStyle.statusText}>
                    {getStatus()}
                </Text>
            )}
        </View>
    );
};
