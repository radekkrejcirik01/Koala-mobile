import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '@store/index/index';
import { Navigation } from '@navigation/index';
import { PreloadService } from '@utils/general/PreloadService';

const App = () => {
    PreloadService.init().catch();

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {}
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
