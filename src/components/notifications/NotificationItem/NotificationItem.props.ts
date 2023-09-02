import { NotificationInterface } from '@interfaces/general.interface';

export interface NotificationItemProps {
    item: NotificationInterface;
    onSendSupport: () => void;
}
