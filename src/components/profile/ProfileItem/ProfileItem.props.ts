export interface ProfileItemProps {
  onPress: () => void;
  icon?: string;
  iconBackgroundColor?: string;
  title: string;
  destructive?: boolean;
  showChevron?: boolean;
  isLast?: boolean;
}
