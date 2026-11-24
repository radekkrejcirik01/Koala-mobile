import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';

// The last known theme of each chat, so a chat opens in its theme before its
// settings load. Kept per logged in user, as the theme is their own
class ChatThemeCacheSingleton {
  // "userId:friendId" → theme key
  private themes: Record<string, string> = {};

  private key = (friendId: number): string =>
    `${store.getState().user.user.id}:${friendId}`;

  // Read once on launch, before the first chat can open
  load = async () => {
    try {
      const value = await PersistStorage.getItem(
        PersistStorageKeys.CHAT_THEMES
      );
      this.themes = value ? JSON.parse(value) : {};
    } catch {
      this.themes = {};
    }
  };

  get = (friendId: number): string | undefined =>
    this.themes[this.key(friendId)];

  // Undefined is the default theme
  set = (friendId: number, theme?: string) => {
    const key = this.key(friendId);
    if (this.themes[key] === theme) {
      return;
    }

    if (theme) {
      this.themes[key] = theme;
    } else {
      delete this.themes[key];
    }
    PersistStorage.setItem(
      PersistStorageKeys.CHAT_THEMES,
      JSON.stringify(this.themes)
    ).catch();
  };
}

export const ChatThemeCache: ChatThemeCacheSingleton =
  new ChatThemeCacheSingleton();
