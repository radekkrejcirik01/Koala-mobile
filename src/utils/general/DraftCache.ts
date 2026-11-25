import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';

// Saving waits for typing to pause, rather than writing every keystroke
const SAVE_DELAY = 500;

// Messages written but not sent yet, so they're still there when the screen
// opens again, also after the app restarts. Kept per logged in user
class DraftCacheSingleton {
  // "userId:draft" → text
  private drafts: Record<string, string> = {};

  private saveTimer?: ReturnType<typeof setTimeout>;

  private key = (draft: string): string =>
    `${store.getState().user.user.id}:${draft}`;

  // Read once on launch, before a screen with a draft can open
  load = async () => {
    try {
      const value = await PersistStorage.getItem(PersistStorageKeys.DRAFTS);
      this.drafts = value ? JSON.parse(value) : {};
    } catch {
      this.drafts = {};
    }
  };

  get = (draft: string): string => this.drafts[this.key(draft)] ?? '';

  // Empty or only spaces removes it
  set = (draft: string, text: string) => {
    const key = this.key(draft);
    const value = text.trim() ? text : undefined;
    if (this.drafts[key] === value) {
      return;
    }

    if (value) {
      this.drafts[key] = value;
    } else {
      delete this.drafts[key];
    }

    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(
      () =>
        PersistStorage.setItem(
          PersistStorageKeys.DRAFTS,
          JSON.stringify(this.drafts)
        ).catch(),
      SAVE_DELAY
    );
  };
}

export const DraftCache: DraftCacheSingleton = new DraftCacheSingleton();

// The message in the chat with one friend
export const chatDraft = (friendId: number): string => `chat:${friendId}`;

// The message on the Share screen
export const SHARE_DRAFT = 'share';

// The emotion picked on the Share screen, its type
export const SHARE_EMOTION_DRAFT = 'shareEmotion';

// Both are cleared once the emotion is saved or sent
export const clearShareDrafts = () => {
  DraftCache.set(SHARE_DRAFT, '');
  DraftCache.set(SHARE_EMOTION_DRAFT, '');
};
