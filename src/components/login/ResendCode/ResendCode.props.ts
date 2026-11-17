export interface ResendCodeProps {
  // Seconds until a new code can be requested
  remaining: number;
  onPress: () => void;
}
