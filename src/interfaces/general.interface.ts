import { MessageType } from '@enums/MessageType';
import { ChatActivityType } from '@enums/ChatActivityType';

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
  // On an emotion, the friend's support
  reaction?: string;
  time: number;
}

export interface ChatInterface {
  id: number;
  friend: UserInterface;
  lastActivity: ChatActivityInterface;
  unread: boolean;
}

// The chat's latest message, or the latest reaction on one of its messages
export interface ChatActivityInterface {
  type: ChatActivityType;
  // Who sent the message or reacted
  userId: number;
  // In milliseconds, unlike message times
  timeMs: number;
  // The new message, or the one reacted to
  message: MessageInterface;
}

export interface SharedEmotionInterface {
  id: number;
  emotion?: string;
  message: string;
  time: number;
}
