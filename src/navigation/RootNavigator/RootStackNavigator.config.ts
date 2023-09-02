import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

export const transitionConfig: TransitionSpec = {
    animation: 'spring',
    config: {
        speed: 2,
        overshootClamping: true
    }
};
