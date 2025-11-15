import { RefObject } from 'react';
import { ConversationInterface } from '@interfaces/general.interface';
import { FlashList } from '@shopify/flash-list';

export interface ChatListProps {
  listRef: RefObject<FlashList<ConversationInterface>>;
  conversation: ConversationInterface[];
  onMessageLongPress: (value: ConversationInterface) => void;
}
