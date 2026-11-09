import { SharedValue } from 'react-native-reanimated';

export interface MessageItemProps {
  children: string;
  outbound: boolean;
  time: number;
  // Swipe offset of the chat, revealing the time
  offset: SharedValue<number>;
  onLongPress: () => void;
  replyMessage: string;
  audioMessage: string;
  showSpace: boolean;
  isLast: boolean;
  reaction?: string;
}
