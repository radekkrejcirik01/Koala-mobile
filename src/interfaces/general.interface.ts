import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';

export interface UserInterface {
    id?: number;
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
    seen: number;
}

export interface TrackInterface {
    id: number;
    receiversNames: string[];
    message: string;
    time: number;
}

export interface EmotionInterface {
    id: number;
    emotion: string;
    message: string;
    tip1?: string;
    tip2?: string;
    isCustom?: boolean;
}
