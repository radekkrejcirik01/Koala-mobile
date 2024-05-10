import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { SecondIntroductionScreenStyle } from '@screens/login/SecondIntroductionScreen/SecondIntroductionScreen.style';

export const SecondIntroductionScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    return (
        <View
            style={[
                SecondIntroductionScreenStyle.container,
                { paddingTop: top + 50 }
            ]}
        >
            <Text style={SecondIntroductionScreenStyle.title}>
                How can friends reply?
            </Text>
            <Text style={SecondIntroductionScreenStyle.description}>
                Your friends can reply directly, send one of support messages or
                send an audio message 🎧
            </Text>
            <FastImage
                source={require('@assets/images/img2.png')}
                style={SecondIntroductionScreenStyle.image}
                resizeMode="contain"
            />
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigateTo(LoginStackNavigatorEnum.SecondScreen)}
                style={SecondIntroductionScreenStyle.buttonView}
            >
                <Text style={SecondIntroductionScreenStyle.buttonText}>
                    Got it!
                </Text>
            </TouchableOpacity>
        </View>
    );
};
