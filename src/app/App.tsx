import React, { useEffect } from 'react';
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
import { TOAST_CONFIG } from '@constants/TOAST_CONFIG';

const App = () => {
  useEffect(() => {
    PreloadService.init().catch();
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
                <Navigation />
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
