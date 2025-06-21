import { StyleProp, ViewStyle } from 'react-native';

export interface TipItemProps {
  tip: string;
  style?: StyleProp<ViewStyle>;
}

export const TipItemDefaultProps: Omit<TipItemProps, 'tip'> = {
  style: {}
};
