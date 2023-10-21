import { UserInterface } from '@interfaces/general.interface';

export interface FriendRequestItemProps {
    item: UserInterface;
    posting: boolean;
    onAcceptInvite: () => void;
}
