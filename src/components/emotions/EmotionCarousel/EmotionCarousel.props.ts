import { SharedValue } from 'react-native-reanimated';
import { EmotionConfig } from '@constants/EMOTIONS';

export interface EmotionCarouselProps {
  // Unbounded index of the selected emotion, so moving past the last emotion
  // keeps rolling the same way instead of jumping back through all of them
  position: number;
}

export interface EmotionCarouselItemProps {
  emotion: EmotionConfig;
  index: number;
  progress: SharedValue<number>;
}
