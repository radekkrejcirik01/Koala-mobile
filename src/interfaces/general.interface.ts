import { MessageType } from '@enums/MessageType';
import { ChatActivityType } from '@enums/ChatActivityType';

export interface UserInterface {
  id?: number;
  name: string;
  username: string;
  profilePhoto: string;
  // The confirmed account email, only on the logged in user
  email?: string;
  // The logged in user's private nickname for a friend
  nickname?: string;
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
  // The quoted message, only on replies
  replyTo?: ReplyInterface;
  time: number;
}

// A quoted message, its text cut by the server. Only the id is left once
// it's deleted
export interface ReplyInterface {
  id: number;
  senderId?: number;
  type?: MessageType;
  message?: string;
  emotion?: string;
  deleted?: boolean;
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
  // What the user wrote with it, left out when there's none
  note?: string;
  time: number;
  // Empty for emotions shared before recipients were recorded
  recipients?: UserInterface[];
}

// The logged in user's private settings for the chat with one friend
export interface ChatSettingsInterface {
  nickname?: string;
  // A key of CHAT_THEMES
  theme?: string;
}
