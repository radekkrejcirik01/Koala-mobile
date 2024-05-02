export interface UserPostInterface {
    name: string;
    username: string;
    password: string;
}
export interface LoginPostInterface {
    username: string;
    password: string;
}

export interface ChangePasswordPostInterface {
    oldPassword: string;
    newPassword: string;
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

export interface StatusReplyNotificationPostInterface {
    senderId: number;
    receiverId: number;
    name: string;
    message: string;
    replyExpression: string;
}

export interface MessageNotificationPostInterface {
    senderId: number;
    receiverId: number;
    receiver: string;
    name: string;
    message: string;
    conversationId: number;
    replyMessage?: string;
    audioBuffer?: string;
}

export interface ExpressionPostInterface {
    userId: number;
    expression: string;
}

export interface RecordingPostInterface {
    buffer: string;
    platform: string;
}

export interface PasswordResetPostInterface {
    username: string;
    email: string;
    friends: string;
}
