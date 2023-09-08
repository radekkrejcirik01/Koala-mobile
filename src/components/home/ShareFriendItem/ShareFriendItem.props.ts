import { UserInterface } from '@interfaces/general.interface';

export interface ShareFriendItemProps {
    item: UserInterface;
    onPress: () => void;
    sent: boolean;
}
