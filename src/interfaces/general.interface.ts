import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

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
  sender?: string;
  name: string;
  profilePhoto?: string;
  message: string;
  type: NotificationItemEnum;
  time: number;
  seen: number;
  conversationId?: number;
}

export interface ConversationInterface {
  id: number;
  type?: NotificationItemEnum;
  senderId: number;
  message: string;
  time: number;
  replyMessage?: string;
  audioMessage?: string;
  isSending?: boolean;
}

export interface HistoryInterface {
  id: number;
  receiversNames: string[];
  message: string;
  time: number;
}

export interface EmotionInterface {
  id: number;
  message: string;
  tip1?: string;
  tip2?: string;
  type: EmotionScreenMessageType;
  isDefault?: boolean;
}

export interface FriendStatusInterface {
  id: number;
  userId: number;
  name: string;
  expression: string;
  time: number;
}
