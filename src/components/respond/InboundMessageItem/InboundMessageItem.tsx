import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
    function isLarge(text: string): boolean {
        return text?.length <= 3;
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
                    <Text style={InboundMessageItemStyle.replyMessageText}>
                        {replyMessage}
                    </Text>
                )}
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={150}
                    onLongPress={onLongPress}
                >
                    {!!replyMessage && <Text>{replyMessage}</Text>}
                    <Text
                        style={[
                            InboundMessageItemStyle.messageText,
                            isLarge(children) &&
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
