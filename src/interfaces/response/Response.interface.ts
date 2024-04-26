import {
    ConversationInterface,
    EmotionInterface,
    ExpressionDataInterface,
    HistoryInterface,
    InviteInterface,
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

export interface ResponseInvitesGetInterface {
    status: string;
    message: string;
    data?: InviteInterface[];
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
    data?: HistoryInterface[];
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

export interface ResponseExpressionsGetInterface {
    status: string;
    message: string;
    data: ExpressionDataInterface[];
    expression: string;
}

export interface ResponseRecordingPostInterface {
    status: string;
    message: string;
    url: string;
}
