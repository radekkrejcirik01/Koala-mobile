import { ConversationInterface } from '@interfaces/general.interface';

export interface ChatListProps {
    conversation: ConversationInterface[];
    onMessageLongPress: (value: ConversationInterface) => void;
}
