import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { InboundMessageItem } from '@components/chat/InboundMessageItem/InboundMessageItem';
import { OutboundMessageItem } from '@components/chat/OutboundMessageItem/OutboundMessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';

export const ChatList = ({
    conversation,
    onMessageLongPress
}: ChatListProps): React.JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const scrollViewRef = useRef(null);

    const isInbound = useCallback(
        (receiver: string): boolean => receiver === username,
        [username]
    );

    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ChatListStyle.container}
        >
            {conversation?.map((value) =>
                isInbound(value.receiver) ? (
                    <InboundMessageItem
                        key={value.id}
                        onLongPress={() => onMessageLongPress(value)}
                        time={value.time}
                        replyMessage={value?.replyMessage}
                        audioMessage={value?.audioMessage}
                    >
                        {value.message}
                    </InboundMessageItem>
                ) : (
                    <OutboundMessageItem
                        onLongPress={() => onMessageLongPress(value)}
                        key={value.id}
                        time={value.time}
                        replyMessage={value?.replyMessage}
                        audioMessage={value?.audioMessage}
                    >
                        {value.message}
                    </OutboundMessageItem>
                )
            )}
        </ScrollView>
    );
};
