import { RefObject } from 'react';
import { MessageInterface } from '@interfaces/general.interface';
import { FlashListRef } from '@shopify/flash-list';

export interface ChatListProps {
  listRef: RefObject<FlashListRef<MessageInterface> | null>;
  messages: MessageInterface[];
  // Shows the Last read marker under this message when the friend wrote after it
  lastReadId?: number;
  onSelectReaction: (reaction: string, messageId: number) => void;
  onPressSupport: (emotionId: number) => void;
  onDeleteMessage: (messageId: number) => void;
  onLoadOlder: () => void;
  name: string;
}
