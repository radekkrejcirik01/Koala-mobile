import { RouteProp } from '@react-navigation/native';
import { SharedEmotionInterface } from '@interfaces/general.interface';

export interface SharedEmotionScreenProps {
  route: RouteProp<
    {
      params: {
        item: SharedEmotionInterface;
      };
    },
    'params'
  >;
}
