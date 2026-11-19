import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

export interface EmotionPillProps {
  emotion?: string;
  text: string;
  // The friend's emotion that you haven't supported yet
  white?: boolean;
  // Narrows wrapped text to its longest line
  textWidth?: number;
  onTextLayout?: (event: NativeSyntheticEvent<TextLayoutEventData>) => void;
}
