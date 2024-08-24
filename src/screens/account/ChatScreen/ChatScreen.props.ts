import { RouteProp } from '@react-navigation/native';

export interface ChatScreenProps {
    route: RouteProp<
        {
            params: {
                id: number;
                chatUserId: number;
                name: string;
                profilePhoto?: string;
                username: string;
                conversationId: number;
            };
        },
        'params'
    >;
}
