import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '@store/index/index';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';

const App = () => {
    useEffect(() => {
        PreloadService.init().catch();
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
