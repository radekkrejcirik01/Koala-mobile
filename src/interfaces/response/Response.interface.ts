import {
    HistoryInterface,
    NotificationInterface,
    UserInterface
} from '@interfaces/general.interface';

export interface ResponseInterface {
    status: string;
    message: string;
}

export interface AuthResponseInterface {
    status: string;
    message: string;
    token: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: UserInterface;
}

export interface ResponseFriendsGetInterface {
    status: string;
    message: string;
    data?: UserInterface[];
}

export interface ResponseNotificationsGetInterface {
    status: string;
    message: string;
    data?: NotificationInterface[];
}

export interface ResponseHistoryGetInterface {
    status: string;
    message: string;
    data?: HistoryInterface[];
}

export interface ResponseUnseenNotificationsGetInterface {
    status: string;
    message: string;
    unseenNotifications?: number;
}
