import { RouteProp } from '@react-navigation/native';

export interface ChatScreenProps {
  route: RouteProp<
    {
      // The friend, opened from a push only the id is known
      params: {
        id: number;
        name?: string;
        username?: string;
        profilePhoto?: string;
      };
    },
    'params'
  >;
}
