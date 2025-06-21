export function getShortMessage(message: string): string {
  return message.length <= 25 ? message : `${message.substring(0, 25)}...`;
}
