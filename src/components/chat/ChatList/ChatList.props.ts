import { RefObject } from 'react';
import { MessageInterface } from '@interfaces/general.interface';
import { FlashListRef } from '@shopify/flash-list';

export interface ChatListProps {
  listRef: RefObject<FlashListRef<MessageInterface> | null>;
  messages: MessageInterface[];
  // Shows the Last read marker under this message when the friend wrote after it
  lastReadId?: number;
  // Briefly marks the message opened from search or shared emotions
  highlightId?: number;
  // The chat theme's color of the user's bubbles
  bubbleColor?: string;
  // The chat theme's background, the app theme's when not set
  backgroundColor?: string;
  // The friend is typing, shown under the last message
  typing: boolean;
  onSelectReaction: (reaction: string, messageId: number) => void;
  onPressSupport: (emotionId: number) => void;
  onDeleteMessage: (messageId: number) => void;
  onLoadOlder: () => void;
  // Opened at an older message, loads the newer ones when scrolling down
  onLoadNewer?: () => void;
  name: string;
  profilePhoto?: string;
}
