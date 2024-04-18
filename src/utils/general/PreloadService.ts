import BootSplash from 'react-native-bootsplash';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';
import {
    setUserEmotionsStateAction,
    setUserStateAction,
    setUserToken
} from '@store/UserReducer';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import { MessagingService } from '@utils/general/MessagingService';
import { NotificationsService } from '@utils/general/NotificationsService';

class PreloadServiceSingleton {
    init = async () => {
        const token = await PersistStorage.getItem(PersistStorageKeys.TOKEN);
        store.dispatch(setUserToken(token));

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
                    store.dispatch(
                        setUserEmotionsStateAction(response.emotions)
                    );

                    if (launching) {
                        await BootSplash.hide({ fade: true });
                    }

                    NotificationsService.getUnseenNotifications();
                    MessagingService.initMessaging(response.data?.id).catch();
                }
            }
        );
    };
}

export const PreloadService: PreloadServiceSingleton =
    new PreloadServiceSingleton();
