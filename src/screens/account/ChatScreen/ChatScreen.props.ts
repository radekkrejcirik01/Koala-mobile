import { RouteProp } from '@react-navigation/native';
import { MessageInterface } from '@interfaces/general.interface';

export interface ChatScreenProps {
  route: RouteProp<
    {
      // The friend, opened from a push only the id is known
      params: {
        id: number;
        name?: string;
        username?: string;
        profilePhoto?: string;
        nickname?: string;
        // Opens the chat at this message, from search or shared emotions
        jump?: {
          id: number;
          // The messages around it, newest first
          messages: MessageInterface[];
          // Tells apart jumping to the same message again
          at: number;
        };
      };
    },
    'params'
  >;
}
