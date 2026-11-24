import { RouteProp } from '@react-navigation/native';
import { UserInterface } from '@interfaces/general.interface';

export interface ChatSettingsScreenProps {
  route: RouteProp<
    {
      params: {
        // Without the nickname, it's loaded with the settings
        friend: UserInterface;
      };
    },
    'params'
  >;
}
