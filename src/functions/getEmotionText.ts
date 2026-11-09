// Either the emotion or the message of a shared emotion may be empty
export function getEmotionText(
  message: string,
  outbound: boolean,
  name: string
): string {
  if (!message) {
    return `${outbound ? 'You' : name} shared a feeling`;
  }

  const subject = outbound ? 'You are' : `${name} is`;

  return `${subject} feeling ${message.toLowerCase()}`;
}
