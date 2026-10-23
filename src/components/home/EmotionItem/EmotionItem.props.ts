import { StyleProp, ViewStyle } from 'react-native';
import { EmotionConfig } from '@constants/EMOTIONS';

export interface EmotionItemProps {
  emotion: EmotionConfig;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
