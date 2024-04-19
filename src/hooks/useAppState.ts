import { useEffect } from 'react';
import { AppState } from 'react-native';

export const useAppState = (onActive: () => void) => {
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'active') {
                    onActive();
                }
            }
        );

        return () => {
            subscription.remove();
        };
    }, [onActive]);
};
