import { RouteProp } from '@react-navigation/native';

export interface ChatScreenProps {
    route: RouteProp<
        {
            params: {
                id: number;
                senderId: number;
                name: string;
                username: string;
                conversationId?: number;
                isStatusReply: boolean;
                isCheckOnMessage: boolean;
            };
        },
        'params'
    >;
}
