import SplashScreen from 'react-native-splash-screen';
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

class PreloadServiceSingleton {
    init = async () => {
        const token = await PersistStorage.getItem(PersistStorageKeys.TOKEN);
        store.dispatch(setUserToken(token));

        if (token) {
            this.loadUserObject();
        } else {
            SplashScreen.hide();
        }
    };

    public loadUserObject = () => {
        getRequest<ResponseUserGetInterface>('user').subscribe(
            (response: ResponseUserGetInterface) => {
                if (response?.status) {
                    store.dispatch(setUserStateAction(response.data));
                    store.dispatch(
                        setUserEmotionsStateAction(response.emotions)
                    );

                    SplashScreen.hide();

                    setTimeout(() => {
                        MessagingService.initMessaging().catch();
                    }, 2000);
                }
            }
        );
    };
}

export const PreloadService: PreloadServiceSingleton =
    new PreloadServiceSingleton();
