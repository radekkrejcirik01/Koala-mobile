import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useNotifications } from '@hooks/useNotifications';
import { useAppState } from '@hooks/useAppState';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { HomeScreenHeader } from '@components/home/HomeScreenHeader/HomeScreenHeader';
import { Expressions } from '@components/home/Expressions/Expressions';
import { Messages } from '@components/home/Messages/Messages';
import { NotificationsService } from '@utils/general/NotificationsService';
import { MessagingService } from '@utils/general/MessagingService';
import { OnlineService } from '@utils/general/OnlineService';

export const HomeScreen = (): React.JSX.Element => {
    useNotifications();
    const { top } = useSafeAreaInsets();

    useAppState(() => {
        NotificationsService.getUnseenNotifications();
        MessagingService.initMessaging().catch();
        OnlineService.update();
        if (Platform.OS === 'ios') {
            PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }
    });

    return (
        <View style={[HomeScreenStyle.container, { paddingTop: top + 20 }]}>
            <HomeScreenHeader />
            <Expressions />
            <Messages />
        </View>
    );
};
