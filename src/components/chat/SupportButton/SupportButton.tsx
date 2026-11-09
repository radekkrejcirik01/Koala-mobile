import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { SupportButtonProps } from '@components/chat/SupportButton/SupportButton.props';
import { SupportButtonStyle } from '@components/chat/SupportButton/SupportButton.style';

export const SupportButton = ({ onPress }: SupportButtonProps): JSX.Element => {
  const onButtonPress = () => {
    trigger(HapticFeedbackTypes.impactMedium);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onButtonPress}
      style={SupportButtonStyle.buttonOuter}
    >
      <View style={SupportButtonStyle.button}>
        <Text style={SupportButtonStyle.emoji}>🫶</Text>
      </View>
    </TouchableOpacity>
  );
};
