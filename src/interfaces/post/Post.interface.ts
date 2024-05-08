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

export interface EmotionMessagePostInterface {
    ids: number[];
    message: string;
}

export interface StatusReplyMessagePostInterface {
    receiverId: number;
    message: string;
    replyExpression: string;
}

export interface MessagePostInterface {
    conversationId: number;
    receiverId: number;
    message: string;
    replyMessage?: string;
    audioBuffer?: string;
}

export interface ExpressionPostInterface {
    userId: number;
    expression: string;
}

export interface PasswordResetPostInterface {
    username: string;
    email: string;
    friends: string;
}

export interface ReplyPostInterface {
    message: string;
}
