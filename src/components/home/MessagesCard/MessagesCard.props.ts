import { StyleProp } from 'react-native';
import { ImageStyle, Source } from 'react-native-fast-image';

export interface MessagesCardProps {
  title: string;
  onPress: () => void;
  image: Source;
  imageStyle: StyleProp<ImageStyle>;
  isKudos?: boolean;
}

export const MessagesCardDefaultProps: Omit<
  MessagesCardProps,
  'title' | 'onPress' | 'image' | 'imageStyle'
> = {
  isKudos: false
};
