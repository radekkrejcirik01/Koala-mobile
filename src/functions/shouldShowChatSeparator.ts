import moment from 'moment';

// Gap between messages that starts a new time separator, in seconds
const CHAT_SEPARATOR_GAP = 60 * 60;

export function shouldShowChatSeparator(
  time: number,
  previousTime?: number
): boolean {
  if (!previousTime) {
    return true;
  }

  return (
    time - previousTime > CHAT_SEPARATOR_GAP ||
    !moment.unix(time).isSame(moment.unix(previousTime), 'day')
  );
}
