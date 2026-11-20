import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotifications } from '@hooks/useNotifications';
import { useAppState } from '@hooks/useAppState';
import { HomeHeader } from '@components/home/HomeHeader/HomeHeader';
import { HomeContent } from '@components/home/HomeContent/HomeContent';
import { NotificationsService } from '@utils/general/NotificationsService';
import { MessagingService } from '@utils/general/MessagingService';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';

export const HomeScreen = (): React.JSX.Element => {
  useNotifications();
  const { top } = useSafeAreaInsets();

  // The unread chats badge refreshes as the socket reconnects, invites have
  // no live event
  useAppState(() => {
    NotificationsService.getUnseenInvites();
    MessagingService.initMessaging().catch();
  });

  return (
    <View style={[HomeScreenStyle.container, { marginTop: top || 10 }]}>
      <HomeHeader />
      <HomeContent />
    </View>
  );
};
