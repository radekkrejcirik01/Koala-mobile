import { StyleProp, ViewStyle } from 'react-native';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export interface IconProps {
  name: IconEnum;
  size?: number;
  style?: StyleProp<ViewStyle>;
  // Tints a single color icon, e.g. black icons in dark mode
  color?: string;
}

export const IconDefaultProps: Omit<IconProps, 'name'> = {
  size: 30,
  style: null
};
