import { useCallback, useEffect } from 'react';
import messaging, {
    FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

export const useNotifications = (
    navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
): { initNotification: () => void } => {
    const initNotification = useCallback(
        () =>
            messaging()
                .getInitialNotification()
                .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                    }
                }),
        []
    );

    useEffect(
        () =>
            // On open notification from background state
            messaging().onNotificationOpenedApp(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                    if (remoteMessage) {
                    }
                }
            ),
        []
    );

    useEffect(
        () =>
            // On in app notification
            messaging().onMessage(
                (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {}
            ),
        []
    );

    return { initNotification };
};
