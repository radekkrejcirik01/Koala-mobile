import { InviteInterface } from '@interfaces/general.interface';

export interface FriendRequestItemProps {
    item: InviteInterface;
    posting: boolean;
    onAcceptInvite: () => void;
    onRemove: () => void;
}
