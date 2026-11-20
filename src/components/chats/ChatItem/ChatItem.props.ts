import { ChatInterface } from '@interfaces/general.interface';

export interface ChatItemProps {
  item: ChatInterface;
  // The friend is typing, shown instead of the preview
  typing: boolean;
  onPress: () => void;
}
