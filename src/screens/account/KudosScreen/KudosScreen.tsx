import React, { JSX } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';

export const KudosScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{ top }}>
            <ScreenHeader title="Kudos" />
        </View>
    );
};
