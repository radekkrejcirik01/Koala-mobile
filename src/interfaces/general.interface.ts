import { MessageType } from '@enums/MessageType';

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

export interface MessageInterface {
  id: number;
  senderId: number;
  type: MessageType;
  message: string;
  emotion?: string;
  reaction?: string;
  // Support only, the emotion it answers
  parentId?: number;
  // Emotion only, true once the friend sent support
  supported?: boolean;
  time: number;
}

export interface ChatInterface {
  id: number;
  friend: UserInterface;
  lastMessage: MessageInterface;
  unread: boolean;
}

export interface SharedEmotionInterface {
  id: number;
  emotion?: string;
  message: string;
  time: number;
}
