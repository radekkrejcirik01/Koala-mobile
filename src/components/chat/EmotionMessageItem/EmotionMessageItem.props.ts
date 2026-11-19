import { SharedValue } from 'react-native-reanimated';

export interface EmotionMessageItemProps {
  // Tells a change of this emotion from a recycled row showing another one
  id: number;
  emotion?: string;
  message: string;
  outbound: boolean;
  time: number;
  // Swipe offset of the chat, revealing the time
  offset: SharedValue<number>;
  name: string;
  supported: boolean;
  // Hidden while its lifted copy is shown above the chat
  lifted?: boolean;
  // A finger taps the pill, until support is opened for the first time
  showTapHint?: boolean;
  // Only for the friend's emotions that aren't supported yet, with where the
  // pill sits on screen
  onPressEmotion?: (layout: EmotionPillLayout) => void;
}

export interface EmotionPillLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  // The text as the pill broke it into lines, so the lifted copy matches it
  text?: string;
}
