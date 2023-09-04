import React, { useEffect } from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import store from '@store/index/index';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';
import { NotificationsService } from '@utils/general/NotificationsService';

const App = () => {
    PreloadService.init().catch();

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'active') {
                    NotificationsService.getUnseenNotifications();
                    if (Platform.OS === 'ios') {
                        PushNotificationIOS.setApplicationIconBadgeNumber(0);
                    }
                }
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <ActionSheetProvider>
            <SafeAreaProvider>
                <StatusBar />
                <Provider store={store}>
                    <Navigation />
                </Provider>
            </SafeAreaProvider>
        </ActionSheetProvider>
    );
};

export default App;
