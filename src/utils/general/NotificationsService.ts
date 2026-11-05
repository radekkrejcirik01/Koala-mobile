import { getRequest } from '@utils/Axios/Axios.service';
import {
  ResponseInvitesGetInterface,
  ResponseUnseenNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import store from '@store/index/index';
import {
  setUnseenInvites,
  setUnseenNotifications
} from '@store/NotificationsReducer';

class NotificationsServiceClass {
  public getUnseenNotifications = () => {
    if (store.getState().user.token) {
      getRequest<ResponseUnseenNotificationsGetInterface>(
        'unseen-notifications'
      ).subscribe((response: ResponseUnseenNotificationsGetInterface) => {
        if (response?.status) {
          store.dispatch(setUnseenNotifications(response?.unseenNotifications));
        }
      });
    }
  };

  public getUnseenInvites = () => {
    if (store.getState().user.token) {
      getRequest<ResponseInvitesGetInterface>('invites').subscribe(
        (response: ResponseInvitesGetInterface) => {
          if (response?.status) {
            store.dispatch(setUnseenInvites(response?.data?.length ?? 0));
          }
        }
      );
    }
  };
}

const NotificationsService: NotificationsServiceClass =
  new NotificationsServiceClass();

export { NotificationsService };
