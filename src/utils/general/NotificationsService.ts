import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseUnseenNotificationsGetInterface } from '@interfaces/response/Response.interface';
import store from '@store/index/index';
import { setUnseenNotifications } from '@store/NotificationsReducer';

class NotificationsServiceClass {
    public getUnseenNotifications = () => {
        if (store.getState().user.token) {
            getRequest<ResponseUnseenNotificationsGetInterface>(
                'unseen-notifications'
            ).subscribe((response: ResponseUnseenNotificationsGetInterface) => {
                if (response?.status) {
                    store.dispatch(
                        setUnseenNotifications(response?.unseenNotifications)
                    );
                }
            });
        }
    };
}

const NotificationsService: NotificationsServiceClass =
    new NotificationsServiceClass();

export { NotificationsService };
