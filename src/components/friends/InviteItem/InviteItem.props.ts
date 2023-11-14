import { InviteInterface } from '@interfaces/general.interface';

export interface InviteItemProps {
    item: InviteInterface;
    posting: boolean;
    onAcceptInvite: () => void;
    onRemove: () => void;
}
