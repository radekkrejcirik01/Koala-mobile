import { RouteProp } from '@react-navigation/native';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { EmotionType } from '@enums/EmotionType';

export interface ChatScreenProps {
  route: RouteProp<
    {
      params: {
        id: number;
        chatUserId: number;
        name: string;
        profilePhoto?: string;
        username: string;
        conversationId: number;
        type?: NotificationItemEnum;
        supportedAt?: number;
        emotion?: EmotionType;
        message?: string;
      };
    },
    'params'
  >;
}
