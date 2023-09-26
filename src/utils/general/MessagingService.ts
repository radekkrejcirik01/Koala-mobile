import messaging from '@react-native-firebase/messaging';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { DevicePostInterface } from '@interfaces/post/Post.interface';

class MessagingServiceClass {
    private registerDevice = (fcmToken: string) => {
        postRequest<ResponseInterface, DevicePostInterface>('device', {
            deviceToken: fcmToken
        }).subscribe();
    };

    private getDeviceToken = async () => {
        await messaging()
            .getToken()
            .then((fcmToken: string) => {
                this.registerDevice(fcmToken);
            });
    };

    private onTokenRefresh = () => {
        messaging().onTokenRefresh((fcmToken: string) => {
            this.registerDevice(fcmToken);
        });
    };

    public initMessaging = async () => {
        const status = await messaging().requestPermission();

        if (status === 1) {
            this.getDeviceToken().catch();
            this.onTokenRefresh();
        }
    };
}

export const MessagingService: MessagingServiceClass =
    new MessagingServiceClass();
