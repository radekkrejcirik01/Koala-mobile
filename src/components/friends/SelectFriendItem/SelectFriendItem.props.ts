import { UserInterface } from '@interfaces/general.interface';

export interface SelectFriendItemProps {
  item: UserInterface;
  onSelect: () => void;
  sent: boolean;
}
