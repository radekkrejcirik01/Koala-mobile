import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getRequest } from '@utils/Axios/Axios.service';
import {
  ResponseInvitesGetInterface,
  ResponseUnreadChatsGetInterface
} from '@interfaces/response/Response.interface';
import store from '@store/index/index';
import { setUnreadChats, setUnseenInvites } from '@store/NotificationsReducer';

class NotificationsServiceClass {
  public getUnreadChats = () => {
    if (store.getState().user.token) {
      getRequest<ResponseUnreadChatsGetInterface>('chats/unread').subscribe(
        (response: ResponseUnreadChatsGetInterface) => {
          if (response?.status) {
            const unreadChats = response?.unreadChats ?? 0;

            store.dispatch(setUnreadChats(unreadChats));
            // A push sets the icon badge to 1, this sets the real count
            if (Platform.OS === 'ios') {
              PushNotificationIOS.setApplicationIconBadgeNumber(unreadChats);
            }
          }
        }
      );
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
