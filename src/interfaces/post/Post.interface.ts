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
    userId: number;
    platform: string;
}

export interface EmotionPostInterface {
    emotion: string;
    message: string;
    tip1: string;
    tip2: string;
}

export interface EmotionNotificationPostInterface {
    senderId: number;
    receiversIds: number[];
    name: string;
    message: string;
}

export interface MessageNotificationPostInterface {
    senderId: number;
    receiverId: number;
    receiver: string;
    name: string;
    message: string;
    conversationId: number;
    replyMessage?: string;
}
