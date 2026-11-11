import { ChatInterface } from '@interfaces/general.interface';
import { MessageType } from '@enums/MessageType';
import { ChatActivityType } from '@enums/ChatActivityType';
import { getShortMessage } from '@functions/getShortMessage';

export function getChatPreview(chat: ChatInterface, userId: number): string {
  const { type, userId: activityUserId, message } = chat.lastActivity;
  const outbound = activityUserId === userId;
  const text =
    message.type === MessageType.Emotion
      ? [message.emotion, message.message].filter(Boolean).join(' ')
      : message.message;

  if (type === ChatActivityType.Reaction) {
    const who = outbound ? 'You' : chat.friend.name;

    // A reaction on an emotion is support
    return message.type === MessageType.Emotion
      ? `${who} sent support 🫶 to "${getShortMessage(text)}"`
      : `${who} reacted ${message.reaction} to "${getShortMessage(text)}"`;
  }

  return `${outbound ? 'You: ' : ''}${getShortMessage(text)}`;
}
