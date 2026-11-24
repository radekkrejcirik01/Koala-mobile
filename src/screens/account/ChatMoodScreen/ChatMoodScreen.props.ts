import { RouteProp } from '@react-navigation/native';
import { UserInterface } from '@interfaces/general.interface';

export interface ChatMoodScreenProps {
  route: RouteProp<
    {
      params: {
        friend: UserInterface;
      };
    },
    'params'
  >;
}
