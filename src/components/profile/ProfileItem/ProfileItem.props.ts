export interface ProfileItemProps {
  onPress: () => void;
  icon: string;
  title: string;
  isLast?: boolean;
}

export const ProfileItemDefaultProps: Omit<
  ProfileItemProps,
  'onPress' | 'icon' | 'title'
> = {
  isLast: false
};
