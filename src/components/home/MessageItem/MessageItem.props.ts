import { EmotionInterface } from '@interfaces/general.interface';

export interface MessageItemProps {
  item: EmotionInterface;
  onPressMessage: () => void;
  onItemLongPress: () => void;
}
