import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OutboundMessageItemProps } from '@components/chat/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/chat/OutboundMessageItem/OutboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { InboundMessageItemStyle } from '@components/chat/InboundMessageItem/InboundMessageItem.style';
import { REGEX } from '@constants/REGEX';

export const OutboundMessageItem = ({
    children,
    onLongPress,
    replyMessage,
    audioMessage,
    isFirst
}: OutboundMessageItemProps): React.JSX.Element => {
    function isEmojiOnly(str: string): boolean {
        return REGEX.test(str);
    }

    return (
        <View
            style={[
                OutboundMessageItemStyle.container,
                isFirst && OutboundMessageItemStyle.marginTop
            ]}
        >
            {isFirst && (
                <Text style={OutboundMessageItemStyle.nameText}>You</Text>
            )}
            <View style={InboundMessageItemStyle.messageContainer}>
                {!!replyMessage && (
                    <View style={OutboundMessageItemStyle.replyMessageView}>
                        <Text style={OutboundMessageItemStyle.replyMessageText}>
                            {replyMessage}
                        </Text>
                    </View>
                )}
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={100}
                    hitSlop={10}
                    onLongPress={onLongPress}
                >
                    {audioMessage ? (
                        <AudioMessageItem
                            audioMessage={audioMessage}
                            outbound
                        />
                    ) : (
                        <Text
                            style={[
                                OutboundMessageItemStyle.messageText,
                                isEmojiOnly(children) &&
                                    OutboundMessageItemStyle.largeText
                            ]}
                        >
                            {children}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};
