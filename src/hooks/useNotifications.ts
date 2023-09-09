import { useEffect } from 'react';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { NotificationsService } from '@utils/general/NotificationsService';

export const useNotifications = () => {
    useEffect(
        () =>
            // On in app notification
            messaging().onMessage(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                        NotificationsService.getUnseenNotifications();
                    }
                }
            ),
        []
    );
};
