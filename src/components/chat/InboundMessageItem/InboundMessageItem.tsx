import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InboundMessageItemProps } from '@components/chat/InboundMessageItem/InboundMessageItem.props';
import { InboundMessageItemStyle } from '@components/chat/InboundMessageItem/InboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { REGEX } from '@constants/REGEX';

export const InboundMessageItem = ({
    name,
    children,
    onLongPress,
    replyMessage,
    audioMessage,
    isFirst
}: InboundMessageItemProps): React.JSX.Element => {
    function isEmojiOnly(str: string): boolean {
        return REGEX.test(str);
    }

    return (
        <View
            style={[
                InboundMessageItemStyle.container,
                isFirst && InboundMessageItemStyle.marginTop
            ]}
        >
            {isFirst && (
                <Text style={InboundMessageItemStyle.nameText}>{name}</Text>
            )}
            <View style={InboundMessageItemStyle.messageContainer}>
                {!!replyMessage && (
                    <View style={InboundMessageItemStyle.replyMessageView}>
                        <Text style={InboundMessageItemStyle.replyMessageText}>
                            {replyMessage}
                        </Text>
                    </View>
                )}
                {audioMessage ? (
                    <AudioMessageItem audioMessage={audioMessage} />
                ) : (
                    <TouchableOpacity
                        activeOpacity={1}
                        delayLongPress={100}
                        hitSlop={10}
                        onLongPress={onLongPress}
                    >
                        <Text
                            style={[
                                InboundMessageItemStyle.messageText,
                                isEmojiOnly(children) &&
                                    InboundMessageItemStyle.largeText
                            ]}
                        >
                            {children}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
