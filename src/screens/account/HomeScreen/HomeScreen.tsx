import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotifications } from '@hooks/useNotifications';
import { useAppState } from '@hooks/useAppState';
import { HomeHeader } from '@components/home/HomeHeader/HomeHeader';
import { HomeContent } from '@components/home/HomeContent/HomeContent';
import { NotificationsService } from '@utils/general/NotificationsService';
import { MessagingService } from '@utils/general/MessagingService';
import { OnlineService } from '@utils/general/OnlineService';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';

export const HomeScreen = (): React.JSX.Element => {
  useNotifications();
  const { top } = useSafeAreaInsets();

  useAppState(() => {
    NotificationsService.getUnreadChats();
    NotificationsService.getUnseenInvites();
    MessagingService.initMessaging().catch();
    OnlineService.update();
  });

  return (
    <View style={[HomeScreenStyle.container, { marginTop: top || 10 }]}>
      <HomeHeader />
      <HomeContent />
    </View>
  );
};
