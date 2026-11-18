import { SharedValue } from 'react-native-reanimated';
import { EmotionConfig } from '@constants/EMOTIONS';

export interface EmotionCarouselProps {
  // Unbounded index of the selected emotion, so moving past the last emotion
  // keeps rolling the same way instead of jumping back through all of them
  position: number;
  // Called when a swipe settles on another emotion or a side one is tapped,
  // with how many it moved
  onStep: (step: number) => void;
  // Called whenever another emotion reaches the centre, while dragging or
  // rolling, with its unbounded position
  onCenterChange: (position: number) => void;
}

export interface EmotionCarouselItemProps {
  emotion: EmotionConfig;
  index: number;
  progress: SharedValue<number>;
}
