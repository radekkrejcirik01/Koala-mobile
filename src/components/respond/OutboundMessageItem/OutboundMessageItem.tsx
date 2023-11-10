import React from 'react';
import { Text } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { OutboundMessageItemProps } from '@components/respond/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/respond/OutboundMessageItem/OutboundMessageItem.style';
import { getMessageTime } from '@functions/getMessageTime';

export const OutboundMessageItem = ({
    children,
    time
}: OutboundMessageItemProps): JSX.Element => {
    function isLarge(text: string): boolean {
        return text?.length <= 3;
    }

    return (
        <GestureHandlerRootView style={OutboundMessageItemStyle.container}>
            <Swipeable
                renderRightActions={() => (
                    <Text style={OutboundMessageItemStyle.timeText}>
                        {getMessageTime(time)}
                    </Text>
                )}
            >
                <Text
                    style={[
                        OutboundMessageItemStyle.messageText,
                        isLarge(children) && OutboundMessageItemStyle.largeText
                    ]}
                >
                    {children}
                </Text>
            </Swipeable>
        </GestureHandlerRootView>
    );
};
