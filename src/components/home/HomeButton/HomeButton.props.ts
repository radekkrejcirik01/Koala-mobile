import { StyleProp, ViewStyle } from 'react-native';

export interface HomeButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
