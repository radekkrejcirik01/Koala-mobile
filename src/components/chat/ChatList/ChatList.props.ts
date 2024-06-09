import { RefObject } from 'react';
import { ScrollView } from 'react-native';
import { ConversationInterface } from '@interfaces/general.interface';

export interface ChatListProps {
    scrollViewRef: RefObject<ScrollView>;
    conversation: ConversationInterface[];
    onMessageLongPress: (value: ConversationInterface) => void;
}
