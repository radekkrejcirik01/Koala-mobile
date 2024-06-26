import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { FirstIntroductionScreenStyle } from '@screens/login/FirstIntroductionScreen/FirstIntroductionScreen.style';
import { Button } from '@components/general/Button/Button';

export const FirstIntroductionScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    return (
        <View
            style={[
                FirstIntroductionScreenStyle.container,
                { paddingTop: top + 50 }
            ]}
        >
            <Text style={FirstIntroductionScreenStyle.title}>
                What is Koala for? 😴
            </Text>
            <Text style={FirstIntroductionScreenStyle.description}>
                Koala helps sending messages to friends 💬
            </Text>
            <FastImage
                source={require('@assets/images/img.png')}
                style={FirstIntroductionScreenStyle.image}
                resizeMode="contain"
            />
            <Button
                title="Got it!"
                onPress={() =>
                    navigateTo(LoginStackNavigatorEnum.SecondIntroductionScreen)
                }
                style={FirstIntroductionScreenStyle.buttonView}
            />
        </View>
    );
};
