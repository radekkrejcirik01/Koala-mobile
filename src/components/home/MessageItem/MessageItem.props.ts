import { EmotionInterface } from '@interfaces/general.interface';

export interface MessageItemProps {
  item: EmotionInterface;
  index: number;
  onPressMessage: () => void;
  onItemLongPress: () => void;
}
