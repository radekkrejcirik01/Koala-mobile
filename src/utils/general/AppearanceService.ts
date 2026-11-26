import { Appearance } from 'react-native';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';
import { setAppearanceAction } from '@store/UserReducer';
import { Appearances } from '@enums/appearance';

// Light or dark regardless of the phone's setting. Applied natively, so
// useColorScheme, alerts, action sheets and the keyboard all follow it
class AppearanceServiceSingleton {
  load = async () => {
    const value = await PersistStorage.getItem(PersistStorageKeys.APPEARANCE);
    const appearance = Object.values(Appearances).includes(value as Appearances)
      ? (value as Appearances)
      : Appearances.SYSTEM;
    this.apply(appearance);
  };

  set = (appearance: Appearances) => {
    this.apply(appearance);
    PersistStorage.setItem(PersistStorageKeys.APPEARANCE, appearance).catch();
  };

  private apply = (appearance: Appearances) => {
    store.dispatch(setAppearanceAction(appearance));
    if (appearance === Appearances.LIGHT) {
      Appearance.setColorScheme('light');
    } else if (appearance === Appearances.DARK) {
      Appearance.setColorScheme('dark');
    } else {
      Appearance.setColorScheme(null);
    }
  };
}

export const AppearanceService: AppearanceServiceSingleton =
  new AppearanceServiceSingleton();
