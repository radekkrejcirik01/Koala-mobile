import { NotificationInterface } from '@interfaces/general.interface';

export interface NotificationItemProps {
    item: NotificationInterface;
    onPress: () => void;
}
