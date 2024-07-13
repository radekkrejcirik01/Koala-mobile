import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { InboundMessageItem } from '@components/chat/InboundMessageItem/InboundMessageItem';
import { OutboundMessageItem } from '@components/chat/OutboundMessageItem/OutboundMessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';

export const ChatList = ({
    scrollViewRef,
    conversation,
    onMessageLongPress
}: ChatListProps): React.JSX.Element => {
    const { id } = useSelector((state: ReducerProps) => state.user.user);

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
                        replyMessage={value?.replyMessage}
                        audioMessage={value?.audioMessage}
                        isFirst={
                            value?.senderId !==
                            conversation[index - 1]?.senderId
                        }
                        isLast={index === conversation?.length - 1}
                        isSending={value?.isSending}
                    >
                        {value.message}
                    </OutboundMessageItem>
                ) : (
                    <InboundMessageItem
                        key={value.id}
                        onLongPress={() => onMessageLongPress(value)}
                        replyMessage={value?.replyMessage}
                        audioMessage={value?.audioMessage}
                        isFirst={
                            value?.senderId !==
                            conversation[index - 1]?.senderId
                        }
                    >
                        {value.message}
                    </InboundMessageItem>
                )
            )}
        </ScrollView>
    );
};
