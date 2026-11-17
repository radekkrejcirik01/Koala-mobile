export interface ProfileItemProps {
  onPress: () => void;
  icon?: string;
  iconBackgroundColor?: string;
  title: string;
  // Shown on the right, before the chevron
  value?: string;
  destructive?: boolean;
  showChevron?: boolean;
  isLast?: boolean;
}
