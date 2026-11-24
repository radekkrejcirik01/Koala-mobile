import { RouteProp } from '@react-navigation/native';
import { UserInterface } from '@interfaces/general.interface';

export interface ChatThemeScreenProps {
  route: RouteProp<
    {
      params: {
        friend: UserInterface;
      };
    },
    'params'
  >;
}
