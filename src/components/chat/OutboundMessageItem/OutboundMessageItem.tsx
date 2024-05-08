import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { OutboundMessageItemProps } from '@components/chat/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/chat/OutboundMessageItem/OutboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { getMessageTime } from '@functions/getMessageTime';

export const OutboundMessageItem = ({
    children,
    onLongPress,
    time,
    replyMessage,
    audioMessage
}: OutboundMessageItemProps): React.JSX.Element => {
    function isEmojiOnly(str: string): boolean {
        const emojiRegex = /^(?:[\p{Emoji}\p{Mark}\p{Zs}\u{200D}])*$/u;

        return emojiRegex.test(str);
    }

    return (
        <GestureHandlerRootView style={OutboundMessageItemStyle.container}>
            <Swipeable
                renderRightActions={() => (
                    <Text style={OutboundMessageItemStyle.timeText}>
                        {getMessageTime(time)}
                    </Text>
                )}
                containerStyle={OutboundMessageItemStyle.contentContainer}
                childrenContainerStyle={
                    OutboundMessageItemStyle.childrenContainer
                }
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
                    delayLongPress={150}
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
            </Swipeable>
        </GestureHandlerRootView>
    );
};
