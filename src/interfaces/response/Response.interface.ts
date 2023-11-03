import {
    ConversationInterface,
    EmotionInterface,
    NotificationInterface,
    TrackInterface,
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
    emotions?: EmotionInterface[];
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

export interface ResponseConversationGetInterface {
    status: string;
    message: string;
    data?: ConversationInterface[];
}

export interface ResponseHistoryGetInterface {
    status: string;
    message: string;
    data?: TrackInterface[];
}

export interface ResponseUnseenNotificationsGetInterface {
    status: string;
    message: string;
    unseenNotifications?: number;
}

export interface ResponseEmotionsGetInterface {
    status: string;
    message: string;
    data: EmotionInterface[];
}
