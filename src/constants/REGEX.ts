const EMOJI =
  '(?:\\p{Extended_Pictographic}|\\p{Regional_Indicator}{2})(?:\\p{Emoji_Modifier}|\\uFE0F|\\u200D\\p{Extended_Pictographic}\\uFE0F?)*';

export const REGEX = new RegExp(`^\\s*(?:${EMOJI}\\s*){1,3}$`, 'u');
