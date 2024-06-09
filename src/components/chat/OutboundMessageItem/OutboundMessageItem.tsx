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
    isFirst
}: OutboundMessageItemProps): React.JSX.Element => (
    <View
        style={[
            OutboundMessageItemStyle.container,
            isFirst && OutboundMessageItemStyle.marginTop
        ]}
    >
        {!!replyMessage && (
            <View style={OutboundMessageItemStyle.replyMessageView}>
                <Text style={OutboundMessageItemStyle.replyMessageText}>
                    {replyMessage}
                </Text>
            </View>
        )}
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
);
