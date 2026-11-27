// Names and usernames can't contain spaces, strip them while typing
export function removeSpaces(value: string): string {
  return value.replace(/\s/g, '');
}
