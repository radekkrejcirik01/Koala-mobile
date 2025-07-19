import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import store from '@store/index/index';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';
import { ThemeProvider } from '../ThemeContext';

const App = () => {
  const theme = useColorScheme();

  useEffect(() => {
    PreloadService.init().catch();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  }, []);

  return (
    <ThemeProvider>
      <ActionSheetProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
          />
          <Provider store={store}>
            <Navigation />
          </Provider>
        </SafeAreaProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
};

export default App;
