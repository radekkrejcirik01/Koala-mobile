import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { FirstScreenStyle } from '@screens/login/FirstScreen/FirstScreen.style';
import { Button } from '@components/general/Button/Button';

export const FirstScreen = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  return (
    <View style={FirstScreenStyle.container}>
      <FastImage
        source={require('@assets/images/koala.png')}
        style={FirstScreenStyle.image}
      />
      <Text style={FirstScreenStyle.titleText}>Koala Messenger</Text>
      <Text style={FirstScreenStyle.descriptionText}>Share, help & chat</Text>
      <Button
        title="Let's start!"
        onPress={() => navigateTo(LoginStackNavigatorEnum.SecondScreen)}
        style={FirstScreenStyle.startButton}
      />
      <TouchableOpacity
        hitSlop={15}
        activeOpacity={0.9}
        onPress={() => navigateTo(LoginStackNavigatorEnum.LoginScreen)}
        style={FirstScreenStyle.loginButtonView}
      >
        <Text style={FirstScreenStyle.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
