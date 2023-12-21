import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { OutboundMessageItemProps } from '@components/respond/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/respond/OutboundMessageItem/OutboundMessageItem.style';
import { getMessageTime } from '@functions/getMessageTime';

export const OutboundMessageItem = ({
    children,
    onLongPress,
    time,
    replyMessage
}: OutboundMessageItemProps): React.JSX.Element => (
    <GestureHandlerRootView style={OutboundMessageItemStyle.container}>
        <Swipeable
            renderRightActions={() => (
                <Text style={OutboundMessageItemStyle.timeText}>
                    {getMessageTime(time)}
                </Text>
            )}
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
                onLongPress={onLongPress}
            >
                <Text style={OutboundMessageItemStyle.messageText}>
                    {children}
                </Text>
            </TouchableOpacity>
        </Swipeable>
    </GestureHandlerRootView>
);
