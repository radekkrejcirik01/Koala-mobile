import React, { JSX } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { useFirstScreenStyle } from '@screens/login/FirstScreen/FirstScreen.style';
import { HomeContentStyle } from '@components/home/HomeContent/HomeContent.style';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { useTheme } from '@hooks/useTheme';
import { getIllustration } from '@functions/getIllustration';
import { Images } from '@enums/images';

// Previews the home screen: same layout, with Sign up / Log in as the buttons
export const FirstScreen = (): JSX.Element => {
  const FirstScreenStyle = useFirstScreenStyle();
  const { isDark } = useTheme();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);
  const { top } = useSafeAreaInsets();

  return (
    <View style={FirstScreenStyle.background}>
      <View style={[FirstScreenStyle.container, { marginTop: top || 10 }]}>
        <Animated.View
          entering={FadeIn.duration(500)}
          style={FirstScreenStyle.header}
        >
          <Text style={FirstScreenStyle.titleText}>Koala</Text>
        </Animated.View>
        <View style={HomeContentStyle.container}>
          <ScrollView
            style={HomeContentStyle.scrollView}
            contentContainerStyle={HomeContentStyle.scrollViewContainer}
          >
            <Animated.View entering={FadeIn.duration(700)}>
              <Image
                source={getIllustration(Images.ROOM, isDark)}
                style={HomeContentStyle.image}
                resizeMode="contain"
              />
              <Text style={FirstScreenStyle.subtitleText}>
                Share how you feel with your friends
              </Text>
            </Animated.View>
          </ScrollView>
          <Animated.View
            entering={FadeInDown.duration(500).delay(200)}
            style={HomeContentStyle.footerContainer}
          >
            <HomeButton
              text="Sign up"
              onPress={() => navigateTo(LoginStackNavigatorEnum.SecondScreen)}
            />
            <HomeButton
              text="Log in"
              onPress={() => navigateTo(LoginStackNavigatorEnum.LoginScreen)}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};
