import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';

export interface UserInterface {
    id?: number;
    name: string;
    username: string;
}

export interface InviteInterface {
    id: number;
    username: string;
}

export interface NotificationInterface {
    id: number;
    senderId?: number;
    sender?: string;
    name: string;
    message: string;
    type: NotificationItemEnum;
    time: number;
    seen: number;
    conversationId?: number;
    emotion?: string;
    expression?: string;
}

export interface ConversationInterface {
    id: number;
    sender: string;
    receiver: string;
    message: string;
    time: number;
    replyMessage?: string;
    audioMessage?: string;
}

export interface HistoryInterface {
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

export interface ExpressionDataInterface {
    id: number;
    userId: number;
    name: string;
    expression: string;
}
