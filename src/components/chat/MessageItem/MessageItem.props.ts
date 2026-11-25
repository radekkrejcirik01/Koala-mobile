import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { ReplyInterface } from '@interfaces/general.interface';

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
  // The chat theme's color of outbound bubbles, the default purple when not set
  bubbleColor?: string;
  // The quoted message on a reply, with who sent it
  replyTo?: ReplyInterface;
  replyName?: string;
  // Scrolls to the quoted message
  onPressReply?: () => void;
  // The bubble with its reaction, measured to lift it into the menu
  contentRef?: (ref: View | null) => void;
}
