import { RouteProp } from '@react-navigation/native';
import { UserInterface } from '@interfaces/general.interface';

export interface ChatSearchScreenProps {
  route: RouteProp<
    {
      params: {
        friend: UserInterface;
      };
    },
    'params'
  >;
}
