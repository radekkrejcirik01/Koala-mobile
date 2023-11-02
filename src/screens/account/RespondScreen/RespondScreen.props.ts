import { RouteProp } from '@react-navigation/native';

export interface RespondScreenProps {
    route: RouteProp<
        {
            params: {
                id: number;
                name: string;
                username: string;
                message: string;
            };
        },
        'params'
    >;
}
