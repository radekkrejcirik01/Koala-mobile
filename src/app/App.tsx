import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import store from '@store/index/index';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';
import COLORS from '@constants/COLORS';

const App = () => {
  useEffect(() => {
    PreloadService.init().catch();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  }, []);

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
};

export default App;
