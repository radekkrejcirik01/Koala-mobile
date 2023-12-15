import { RouteProp } from '@react-navigation/native';

export interface SharedScreenProps {
    route: RouteProp<
        {
            params: {
                receiverId: number;
            };
        },
        'params'
    >;
}
