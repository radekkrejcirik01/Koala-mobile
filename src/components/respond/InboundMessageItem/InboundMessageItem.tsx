import React from 'react';
import { Text } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { InboundMessageItemProps } from '@components/respond/InboundMessageItem/InboundMessageItem.props';
import { InboundMessageItemStyle } from '@components/respond/InboundMessageItem/InboundMessageItem.style';
import { getMessageTime } from '@functions/getMessageTime';

export const InboundMessageItem = ({
    children,
    time
}: InboundMessageItemProps): JSX.Element => {
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
                <Text
                    style={[
                        InboundMessageItemStyle.messageText,
                        isLarge(children) && InboundMessageItemStyle.largeText
                    ]}
                >
                    {children}
                </Text>
            </Swipeable>
        </GestureHandlerRootView>
    );
};
