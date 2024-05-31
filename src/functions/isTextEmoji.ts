import { REGEX } from '@constants/REGEX';

export function isTextEmoji(str: string): boolean {
    return REGEX.test(str);
}
