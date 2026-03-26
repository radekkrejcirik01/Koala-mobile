import BootSplash from 'react-native-bootsplash';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';
import {
  setImageAction,
  setUserStateAction,
  setUserToken
} from '@store/UserReducer';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import { MessagingService } from '@utils/general/MessagingService';
import { NotificationsService } from '@utils/general/NotificationsService';
import { OnlineService } from '@utils/general/OnlineService';
import { Images } from '@enums/images';

class PreloadServiceSingleton {
  init = async () => {
    const token = await PersistStorage.getItem(PersistStorageKeys.TOKEN);
    const image = await PersistStorage.getItem(PersistStorageKeys.IMAGE);
    store.dispatch(setUserToken(token));
    store.dispatch(setImageAction(image || Images.ROOM));

    if (token) {
      this.loadUserObject(true);
    } else {
      await BootSplash.hide({ fade: true });
    }
  };

  public loadUserObject = (launching = false) => {
    getRequest<ResponseUserGetInterface>('user').subscribe(
      async (response: ResponseUserGetInterface) => {
        if (response?.status) {
          store.dispatch(setUserStateAction(response.data));
          NotificationsService.getUnseenNotifications();
          if (launching) {
            await BootSplash.hide({ fade: true });
          }
          MessagingService.initMessaging().catch();
          OnlineService.update();
        }
      }
    );
  };
}

export const PreloadService: PreloadServiceSingleton =
  new PreloadServiceSingleton();
