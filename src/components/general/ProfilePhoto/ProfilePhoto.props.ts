import { StyleProp, ViewStyle } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';

export interface ProfilePhotoProps {
  name: string;
  photo?: string;
  size: number;
  onPhotoPress?: () => void;
  textBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  acronymStyle?: StyleProp<ViewStyle>;
}

export const ProfilePhotoDefaultProps: Omit<
  ProfilePhotoProps,
  'name' | 'size'
> = {
  photo: null,
  textBackgroundColor: null,
  onPhotoPress: null,
  style: {}
};
