import { LiveEventType } from '@enums/LiveEventType';
import { MessageInterface } from '@interfaces/general.interface';

// friendId is always the other person in the chat
export interface LiveMessageNewEvent {
  type: LiveEventType.MessageNew;
  data: { friendId: number; message: MessageInterface };
}

export interface LiveMessageDeletedEvent {
  type: LiveEventType.MessageDeleted;
  data: { friendId: number; id: number };
}

export interface LiveMessageReactionEvent {
  type: LiveEventType.MessageReaction;
  // reaction is null when removed
  data: { friendId: number; id: number; reaction: string | null };
}

export interface LiveChatReadEvent {
  type: LiveEventType.ChatRead;
  // lastReadAt in milliseconds
  data: {
    friendId: number;
    readerId: number;
    lastReadMessageId: number;
    lastReadAt: number;
  };
}

export interface LiveTypingEvent {
  type: LiveEventType.Typing;
  data: { friendId: number; typing: boolean };
}

export interface LivePresenceEvent {
  type: LiveEventType.Presence;
  // lastOnline in seconds
  data: { userId: number; online: boolean; lastOnline: number };
}

// Unknown types may arrive too and are ignored
export type LiveEvent =
  | LiveMessageNewEvent
  | LiveMessageDeletedEvent
  | LiveMessageReactionEvent
  | LiveChatReadEvent
  | LiveTypingEvent
  | LivePresenceEvent;

export interface LiveTypingSendInterface {
  action: 'typing';
  friendId: number;
  typing: boolean;
}

export interface LivePingSendInterface {
  action: 'ping';
}
