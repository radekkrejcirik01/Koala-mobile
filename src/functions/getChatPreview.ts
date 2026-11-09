import { MessageInterface } from '@interfaces/general.interface';
import { MessageType } from '@enums/MessageType';
import { getShortMessage } from '@functions/getShortMessage';

export function getChatPreview(
  lastMessage: MessageInterface,
  outbound: boolean
): string {
  if (lastMessage.type === MessageType.Support) {
    return outbound ? 'You sent your support 🫶' : 'Sent support 🫶';
  }

  const text =
    lastMessage.type === MessageType.Emotion
      ? [lastMessage.emotion, lastMessage.message].filter(Boolean).join(' ')
      : lastMessage.message;

  return `${outbound ? 'You: ' : ''}${getShortMessage(text)}`;
}
