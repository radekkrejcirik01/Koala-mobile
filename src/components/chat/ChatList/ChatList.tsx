import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useReactionBar } from '@hooks/useReactionBar';
import { ReducerProps } from '@store/index/index.props';
import { ChatListProps } from '@components/chat/ChatList/ChatList.props';
import { OutboundMessageItem } from '@components/chat/OutboundMessageItem/OutboundMessageItem';
import { InboundMessageItem } from '@components/chat/InboundMessageItem/InboundMessageItem';
import { ChatListStyle } from '@components/chat/ChatList/ChatList.style';
import { ConversationInterface } from '@interfaces/general.interface';
import { ReactionBar } from '@components/chat/ReactionBar/ReactionBar';

export const ChatList = ({
  listRef,
  conversation,
  onSelectReaction
}: ChatListProps): React.JSX.Element => {
  const { id } = useSelector((state: ReducerProps) => state.user.user);

  const {
    reactionState,
    scale,
    opacity,
    translateY,
    registerMessageRef,
    openReactions,
    hideReactions,
    selectReaction
  } = useReactionBar(onSelectReaction);

  const isOutbound = useCallback(
    (senderId: number): boolean => senderId === id,
    [id]
  );

  const renderItem = ({
    item: value,
    index
  }: ListRenderItemInfo<ConversationInterface>) => {
    return (
      <View ref={registerMessageRef(value.id)} collapsable={false}>
        {isOutbound(value.senderId) ? (
          <OutboundMessageItem
            key={value.id}
            replyMessage={value?.replyMessage}
            audioMessage={value?.audioMessage}
            showSpace={conversation[index - 1]?.senderId !== id}
            isLast={conversation[0]?.id === value.id}
            onLongPress={() => {}}
            reaction={value?.reaction}
          >
            {value.message}
          </OutboundMessageItem>
        ) : (
          <InboundMessageItem
            key={value.id}
            replyMessage={value?.replyMessage}
            audioMessage={value?.audioMessage}
            showSpace={conversation[index - 1]?.senderId === id}
            isLast={conversation[0]?.id === value.id}
            onLongPress={() => openReactions(value.id)}
            reaction={value?.reaction}
          >
            {value.message}
          </InboundMessageItem>
        )}
      </View>
    );
  };

  return (
    <View style={ChatListStyle.container}>
      <FlashList
        ref={listRef}
        inverted
        data={conversation}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ChatListStyle.scrollViewContainer}
        renderItem={renderItem}
      />

      <ReactionBar
        reactionState={reactionState}
        scale={scale}
        opacity={opacity}
        translateY={translateY}
        onClose={hideReactions}
        onSelect={selectReaction}
      />
    </View>
  );
};
