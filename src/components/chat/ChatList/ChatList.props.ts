import { ConversationInterface } from '@interfaces/general.interface';

export interface ChatListProps {
    name: string;
    conversation: ConversationInterface[];
    onMessageLongPress: (value: ConversationInterface) => void;
}
