import { SharedValue } from 'react-native-reanimated';

export interface EmotionMessageItemProps {
  emotion?: string;
  message: string;
  outbound: boolean;
  time: number;
  // Swipe offset of the chat, revealing the time
  offset: SharedValue<number>;
  name: string;
  supported: boolean;
  onPressSupport: () => void;
}
