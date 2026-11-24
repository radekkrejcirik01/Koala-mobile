import COLORS from '@constants/COLORS';

export interface ChatThemeConfig {
  // Stored on the server, unknown keys fall back to the default
  key: string;
  name: string;
  // The user's own message bubbles
  bubble: string;
  // The chat background, the app theme's background when not set
  background?: string;
}

export const DEFAULT_CHAT_THEME: ChatThemeConfig = {
  key: 'default',
  name: 'Default',
  bubble: COLORS.PURPLE
};

export const CHAT_THEMES: ChatThemeConfig[] = [
  DEFAULT_CHAT_THEME,
  { key: 'ocean', name: 'Ocean', bubble: '#4a90e2', background: '#eaf3fc' },
  { key: 'sunset', name: 'Sunset', bubble: '#f08a5d', background: '#fdf0ea' },
  { key: 'forest', name: 'Forest', bubble: '#52b788', background: '#ebf6f0' },
  { key: 'berry', name: 'Berry', bubble: '#e5739b', background: '#fcedf2' }
];

export const getChatTheme = (key?: string): ChatThemeConfig =>
  CHAT_THEMES.find((item) => item.key === key) ?? DEFAULT_CHAT_THEME;
