import { RouteProp } from '@react-navigation/native';
import { EmotionType } from '@enums/EmotionType';

export interface ShareSendScreenProps {
  route: RouteProp<
    {
      params: {
        emotion: EmotionType;
      };
    },
    'params'
  >;
}
