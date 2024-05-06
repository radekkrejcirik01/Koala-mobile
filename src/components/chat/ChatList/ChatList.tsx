import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { InboundMessageItem } from '@components/chat/InboundMessageItem/InboundMessageItem';
import { OutboundMessageItem } from '@components/chat/OutboundMessageItem/OutboundMessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';

export const ChatList = ({
    name,
    conversation,
    onMessageLongPress
}: ChatListProps): React.JSX.Element => {
    const { id } = useSelector((state: ReducerProps) => state.user.user);

    const scrollViewRef = useRef(null);

    const isOutbound = useCallback(
        (senderId: number): boolean => senderId === id,
        [id]
    );

    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ChatListStyle.container}
        >
            {conversation?.map((value, index) =>
                isOutbound(value.senderId) ? (
                    <OutboundMessageItem
                        onLongPress={() => onMessageLongPress(value)}
                        key={value.id}
                        time={value.time}
                        replyMessage={value?.replyMessage}
                        audioMessage={value?.audioMessage}
                    >
                        {value.message}
                    </OutboundMessageItem>
                ) : (
                    <InboundMessageItem
                        key={value.id}
                        name={name}
                        onLongPress={() => onMessageLongPress(value)}
                        time={value.time}
                        replyMessage={value?.replyMessage}
                        audioMessage={value?.audioMessage}
                        isLast={
                            value?.senderId !==
                            conversation[index + 1]?.senderId
                        }
                    >
                        {value.message}
                    </InboundMessageItem>
                )
            )}
        </ScrollView>
    );
};
