import { ReplyInterface } from '@interfaces/general.interface';
import { MessageType } from '@enums/MessageType';

// The quoted text, an emotion shows its text and emoji
export function getReplyText(reply: ReplyInterface): string {
  if (reply.type === MessageType.Emotion) {
    return [reply.message, reply.emotion].filter(Boolean).join(' ');
  }

  return reply.message ?? '';
}
