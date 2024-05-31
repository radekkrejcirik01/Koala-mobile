import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InboundMessageItemProps } from '@components/chat/InboundMessageItem/InboundMessageItem.props';
import { InboundMessageItemStyle } from '@components/chat/InboundMessageItem/InboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { isTextEmoji } from '@functions/isTextEmoji';

export const InboundMessageItem = ({
    name,
    children,
    onLongPress,
    replyMessage,
    audioMessage,
    isFirst
}: InboundMessageItemProps): React.JSX.Element => (
    <View style={isFirst && InboundMessageItemStyle.marginTop}>
        {isFirst && (
            <View style={InboundMessageItemStyle.row}>
                <Text style={InboundMessageItemStyle.nameText}>{name}</Text>
                <Text style={InboundMessageItemStyle.emojiText}>💬</Text>
            </View>
        )}
        <View style={InboundMessageItemStyle.messageContainer}>
            {!!replyMessage && (
                <View style={InboundMessageItemStyle.replyMessageView}>
                    <Text style={InboundMessageItemStyle.replyMessageText}>
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
                            InboundMessageItemStyle.messageText,
                            isTextEmoji(children) &&
                                InboundMessageItemStyle.largeText
                        ]}
                    >
                        {children}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    </View>
);
