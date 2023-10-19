import { UserInterface } from '@interfaces/general.interface';

export interface ShareFriendItemProps {
    item: UserInterface;
    onSelect: () => void;
    sent: boolean;
}
