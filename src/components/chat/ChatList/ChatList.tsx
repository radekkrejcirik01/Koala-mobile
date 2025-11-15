import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';
import { OutboundMessageItem } from '@components/chat/OutboundMessageItem/OutboundMessageItem';
import { InboundMessageItem } from '@components/chat/InboundMessageItem/InboundMessageItem';
import { FlashList } from '@shopify/flash-list';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';

export const ChatList = ({
  listRef,
  conversation,
  onMessageLongPress
}: ChatListProps): React.JSX.Element => {
  const { id } = useSelector((state: ReducerProps) => state.user.user);

  const isOutbound = useCallback(
    (senderId: number): boolean => senderId === id,
    [id]
  );

  return (
    <FlashList
      ref={listRef}
      inverted
      showsVerticalScrollIndicator={false}
      data={conversation}
      keyboardDismissMode="on-drag"
      estimatedItemSize={100}
      contentContainerStyle={ChatListStyle.scrollViewContainer}
      renderItem={({ item: value }) =>
        isOutbound(value.senderId) ? (
          <OutboundMessageItem
            onLongPress={() => onMessageLongPress(value)}
            key={value.id}
            replyMessage={value?.replyMessage}
            audioMessage={value?.audioMessage}
          >
            {value.message}
          </OutboundMessageItem>
        ) : (
          <InboundMessageItem
            key={value.id}
            onLongPress={() => onMessageLongPress(value)}
            replyMessage={value?.replyMessage}
            audioMessage={value?.audioMessage}
          >
            {value.message}
          </InboundMessageItem>
        )
      }
    />
  );
};
