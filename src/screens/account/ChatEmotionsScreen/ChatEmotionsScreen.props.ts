import { RouteProp } from '@react-navigation/native';
import { UserInterface } from '@interfaces/general.interface';

export interface ChatEmotionsScreenProps {
  route: RouteProp<
    {
      params: {
        friend: UserInterface;
      };
    },
    'params'
  >;
}
