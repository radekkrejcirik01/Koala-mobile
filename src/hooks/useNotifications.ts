import { useEffect } from 'react';
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { NotificationsService } from '@utils/general/NotificationsService';
import { getCurrentRouteName } from '@utils/getCurrentRouteName.ts';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum.ts';

export const useNotifications = () => {
  useEffect(
    () =>
      // On in app notification
      messaging().onMessage(
        (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          const currentScreen = getCurrentRouteName();
          if (
            remoteMessage &&
            currentScreen !== AccountStackNavigatorEnum.ChatScreen
          ) {
            Toast.show({
              type: 'success',
              text1: remoteMessage.notification.title,
              text2: remoteMessage.notification.body
            });
            NotificationsService.getUnseenNotifications();
          }
        }
      ),
    []
  );
};
