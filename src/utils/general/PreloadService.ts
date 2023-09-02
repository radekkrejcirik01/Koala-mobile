import SplashScreen from 'react-native-splash-screen';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';
import { setUserStateAction, setUserToken } from '@store/UserReducer';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';

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
                }
                SplashScreen.hide();
            }
        );
    };
}

export const PreloadService: PreloadServiceSingleton =
    new PreloadServiceSingleton();
