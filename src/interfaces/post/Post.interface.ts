export interface UserPostInterface {
    name: string;
    username: string;
    password: string;
}
export interface LoginPostInterface {
    username: string;
    password: string;
}

export interface InvitePostInterface {
    receiver: string;
}

export interface DevicePostInterface {
    deviceToken: string;
}

export interface EmotionPostInterface {
    emotion: string;
    message: string;
    tip1: string;
    tip2: string;
}

export interface EmotionNotificationPostInterface {
    receivers: string[];
    name: string;
    message: string;
}

export interface SupportNotificationPostInterface {
    id: number;
    receiver: string;
    name: string;
    message: string;
}
