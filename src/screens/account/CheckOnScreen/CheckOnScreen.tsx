import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckOnScreenStyle } from '@screens/account/CheckOnScreen/CheckOnScreen.style';

export const CheckOnScreen = () => {
    const { top } = useSafeAreaInsets();

    return (
        <ScrollView
            style={{ paddingTop: top + 10 }}
            contentContainerStyle={CheckOnScreenStyle.contentContainer}
        >
            <Text style={CheckOnScreenStyle.titleText}>Check-on</Text>
        </ScrollView>
    );
};
