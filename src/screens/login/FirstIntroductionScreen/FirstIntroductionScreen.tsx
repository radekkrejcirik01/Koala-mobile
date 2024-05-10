import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { FirstIntroductionScreenStyle } from '@screens/login/FirstIntroductionScreen/FirstIntroductionScreen.style';

export const FirstIntroductionScreen = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    return (
        <View style={FirstIntroductionScreenStyle.container}>
            <Text style={FirstIntroductionScreenStyle.title}>
                What can you do with Koala? 😴
            </Text>
            <Text style={FirstIntroductionScreenStyle.description}>
                You can share one of our predefined messages, create your own or
                use direct sharing to message your friends 💬
            </Text>
            <FastImage
                source={require('@assets/images/img.png')}
                style={FirstIntroductionScreenStyle.image}
                resizeMode="contain"
            />
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                    navigateTo(LoginStackNavigatorEnum.SecondIntroductionScreen)
                }
                style={FirstIntroductionScreenStyle.buttonView}
            >
                <Text style={FirstIntroductionScreenStyle.buttonText}>
                    Got it!
                </Text>
            </TouchableOpacity>
        </View>
    );
};
