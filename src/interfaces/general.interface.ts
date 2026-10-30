import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { EmotionType } from '@enums/EmotionType';

export interface UserInterface {
  id?: number;
  name: string;
  username: string;
  profilePhoto: string;
}

export interface InviteInterface {
  id: number;
  username: string;
  profilePhoto?: string;
}

export interface NotificationInterface {
  id: number;
  senderId?: number;
  messageSenderId?: number;
  sender?: string;
  name: string;
  profilePhoto?: string;
  message: string;
  type: NotificationItemEnum;
  time: number;
  seen: number;
  conversationId?: number;
  supportedAt?: number;
  emotion?: EmotionType;
}

export interface ConversationInterface {
  id: number;
  type?: NotificationItemEnum;
  senderId: number;
  message: string;
  time: number;
  replyMessage?: string;
  audioMessage?: string;
  reaction?: string;
  supportedAt?: number;
  emotion?: EmotionType;
}

export interface HistoryInterface {
  id: number;
  receiversNames: string[];
  message: string;
  time: number;
}
