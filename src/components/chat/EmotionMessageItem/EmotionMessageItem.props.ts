export interface EmotionMessageItemProps {
  emotion?: string;
  message: string;
  outbound: boolean;
  name: string;
  supported: boolean;
  onPressSupport: () => void;
}
