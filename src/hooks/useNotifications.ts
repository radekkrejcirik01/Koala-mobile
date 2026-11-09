import { useEffect } from 'react';
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@hooks/useNavigation';
import { NotificationsService } from '@utils/general/NotificationsService';
import { getCurrentRouteName } from '@utils/getCurrentRouteName.ts';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum.ts';

export const useNotifications = () => {
  const { navigateTo } = useNavigation();

  useEffect(
    () =>
      // On in app notification
      messaging().onMessage(
        (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          const currentScreen = getCurrentRouteName();
          if (
            remoteMessage &&
            currentScreen !== AccountStackNavigatorEnum.ChatScreen &&
            currentScreen !== AccountStackNavigatorEnum.ChatsScreen
          ) {
            Toast.show({
              type: 'success',
              text1: remoteMessage.notification.title,
              text2: remoteMessage.notification.body
            });
            NotificationsService.getUnreadChats();
          }
        }
      ),
    []
  );

  useEffect(() => {
    // Tapping a chat push opens the chat with the friend who sent it
    const openChat = (
      remoteMessage: FirebaseMessagingTypes.RemoteMessage | null
    ) => {
      const friendId = Number(remoteMessage?.data?.friendId);
      if (friendId) {
        navigateTo(AccountStackNavigatorEnum.ChatScreen, { id: friendId });
      }
    };

    messaging().getInitialNotification().then(openChat).catch();

    return messaging().onNotificationOpenedApp(openChat);
  }, [navigateTo]);
};
