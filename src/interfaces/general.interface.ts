import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';

export interface UserInterface {
    name: string;
    username: string;
}

export interface NotificationInterface {
    id: number;
    sender: string;
    name: string;
    message: string;
    type: NotificationItemEnum;
    liked?: number;
    time: number;
}

export interface TrackInterface {
    id: number;
    receiversNames: string[];
    message: string;
    time: number;
}
