import { RouteProp } from '@react-navigation/native';
import { UserInterface } from '@interfaces/general.interface';

export interface ChatNicknameScreenProps {
  route: RouteProp<
    {
      params: {
        friend: UserInterface;
      };
    },
    'params'
  >;
}
