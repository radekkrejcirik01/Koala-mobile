import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextLayoutEventData
} from 'react-native';

export interface EmotionPillProps {
  emotion?: string;
  text: string;
  // The friend's emotion that you haven't supported yet
  white?: boolean;
  // The ring around the pill, matching the chat theme's background
  ringColor?: string;
  // Narrows wrapped text to its longest line
  textWidth?: number;
  onTextLayout?: (event: NativeSyntheticEvent<TextLayoutEventData>) => void;
  // The size the text was laid out at
  onTextSize?: (event: LayoutChangeEvent) => void;
}
