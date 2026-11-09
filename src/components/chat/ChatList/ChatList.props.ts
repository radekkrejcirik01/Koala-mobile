import { RefObject } from 'react';
import { MessageInterface } from '@interfaces/general.interface';
import { FlashList } from '@shopify/flash-list';

export interface ChatListProps {
  listRef: RefObject<FlashList<MessageInterface>>;
  messages: MessageInterface[];
  onSelectReaction: (reaction: string, messageId: number) => void;
  onPressSupport: (emotionId: number) => void;
  onDeleteMessage: (messageId: number) => void;
  onLoadOlder: () => void;
  name: string;
}
