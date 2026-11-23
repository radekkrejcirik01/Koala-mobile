import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from '@store/index/index';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';
import { AnalyticsService } from '@utils/general/AnalyticsService';
import { LiveService } from '@utils/general/LiveService';
import { TOAST_CONFIG } from '@constants/TOAST_CONFIG';

const App = () => {
  // Navigation waits for the stored token so the right stack is the first
  // one rendered, otherwise the switch from login to home animates on launch
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    AnalyticsService.init();
    PreloadService.init()
      .finally(() => setReady(true))
      .catch();
    LiveService.init();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <KeyboardProvider navigationBarTranslucent>
          <ActionSheetProvider>
            <SafeAreaProvider>
              <StatusBar barStyle="dark-content" translucent />
              <Provider store={store}>
                {ready && <Navigation />}
              </Provider>
            </SafeAreaProvider>
          </ActionSheetProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
      <Toast config={TOAST_CONFIG} />
    </>
  );
};

export default App;
