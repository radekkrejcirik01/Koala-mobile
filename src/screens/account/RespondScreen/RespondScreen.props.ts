import { RouteProp } from '@react-navigation/native';

export interface RespondScreenProps {
    route: RouteProp<
        {
            params: {
                id: number;
                senderId: number;
                name: string;
                username: string;
                conversationId?: number;
                isStatusReply: boolean;
            };
        },
        'params'
    >;
}
