import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { DevicePostInterface } from '@interfaces/post/Post.interface';
import store from '@store/index/index';

class MessagingServiceClass {
  private fcmToken: string;

  private registerDevice = () => {
    const userId = store.getState().user.user.id;

    if (userId) {
      postRequest<ResponseInterface, DevicePostInterface>('device', {
        deviceToken: this.fcmToken,
        userId,
        platform: Platform.OS
      }).subscribe();
    }
  };

  private getDeviceToken = async () => {
    await messaging()
      .getToken()
      .then((token: string) => {
        this.fcmToken = token;

        this.registerDevice();
      });
  };

  private onTokenRefresh = () => {
    messaging().onTokenRefresh((token: string) => {
      this.fcmToken = token;

      this.registerDevice();
    });
  };

  private getToken = () => {
    this.getDeviceToken().catch();
    this.onTokenRefresh();
  };

  public initMessaging = async () => {
    if (Platform.OS === 'ios') {
      const status = await messaging().requestPermission();

      if (status === 1) {
        this.getToken();
      }
    }

    if (Platform.OS === 'android') {
      const requestNotificationPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        return result;
      };

      const checkNotificationPermission = async () => {
        const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        return result;
      };

      const checkPermission = await checkNotificationPermission();
      if (checkPermission !== RESULTS.GRANTED) {
        const permissionStatus = await requestNotificationPermission();

        if (permissionStatus === RESULTS.GRANTED) {
          this.getToken();
        }
      } else {
        this.getToken();
      }
    }
  };
}

export const MessagingService: MessagingServiceClass =
  new MessagingServiceClass();
