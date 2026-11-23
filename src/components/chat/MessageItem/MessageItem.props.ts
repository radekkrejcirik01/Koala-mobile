import { SharedValue } from 'react-native-reanimated';

export interface MessageItemProps {
  children: string;
  outbound: boolean;
  time: number;
  // Swipe offset of the chat, revealing the time
  offset: SharedValue<number>;
  onLongPress: () => void;
  showSpace: boolean;
  isLast: boolean;
  // A message of the same group right above or below, the corners on the
  // sender's side between them are tighter
  joinedAbove: boolean;
  joinedBelow: boolean;
  reaction?: string;
  // The friend's photo next to inbound messages, only on the last of a group
  name: string;
  profilePhoto?: string;
  showPhoto: boolean;
}
