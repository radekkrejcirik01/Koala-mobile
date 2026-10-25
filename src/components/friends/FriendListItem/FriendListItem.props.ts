import { UserInterface } from '@interfaces/general.interface';

export interface FriendListItemProps {
  item: UserInterface;
  onSelect: () => void;
  sent: boolean;
}
