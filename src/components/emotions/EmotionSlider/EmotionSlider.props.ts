import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { EmotionConfig } from '@constants/EMOTIONS';

export interface EmotionSliderProps {
  // Index of the selected emotion in EMOTIONS
  position: number;
  // Called when a swipe settles on another emotion or one is tapped, with
  // how many it moved
  onStep: (step: number) => void;
  // Called whenever the selection passes another emotion, while dragging or
  // springing, with its index
  onCenterChange: (position: number) => void;
  // Style of the swipe area, which wraps the row and the children above it
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  // Rendered below the row
  footer?: ReactNode;
}

export interface EmotionIndicatorItemProps {
  emotion: EmotionConfig;
  index: number;
  progress: SharedValue<number>;
  onSelect: (index: number) => void;
}
