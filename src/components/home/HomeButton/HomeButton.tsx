import React, { JSX, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { HomeButtonProps } from '@components/home/HomeButton/HomeButton.props';
import { HomeButtonStyle } from '@components/home/HomeButton/HomeButton.style';

export const HomeButton = ({
  text,
  onPress
}: HomeButtonProps): JSX.Element => {
  const onButtonPress = useCallback(() => {
    trigger(HapticFeedbackTypes.impactMedium);
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onButtonPress}
      style={HomeButtonStyle.container}
    >
      <Text style={HomeButtonStyle.text}>{text}</Text>
    </TouchableOpacity>
  );
};
