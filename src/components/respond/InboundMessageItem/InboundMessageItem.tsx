import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { InboundMessageItemProps } from '@components/respond/InboundMessageItem/InboundMessageItem.props';
import { InboundMessageItemStyle } from '@components/respond/InboundMessageItem/InboundMessageItem.style';
import { getMessageTime } from '@functions/getMessageTime';

export const InboundMessageItem = ({
    children,
    onLongPress,
    time,
    replyMessage
}: InboundMessageItemProps): React.JSX.Element => {
    function isEmojiOnly(str: string): boolean {
        const emojiRegex = /^(?:[\p{Emoji}\p{Mark}\p{Zs}\u{200D}])*$/u;

        return emojiRegex.test(str);
    }

    return (
        <GestureHandlerRootView style={InboundMessageItemStyle.container}>
            <Swipeable
                renderLeftActions={() => (
                    <Text style={InboundMessageItemStyle.timeText}>
                        {getMessageTime(time)}
                    </Text>
                )}
            >
                {!!replyMessage && (
                    <View style={InboundMessageItemStyle.replyMessageView}>
                        <Text style={InboundMessageItemStyle.replyMessageText}>
                            {replyMessage}
                        </Text>
                    </View>
                )}
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={150}
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
            </Swipeable>
        </GestureHandlerRootView>
    );
};
