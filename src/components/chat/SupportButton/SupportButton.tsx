import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { SupportButtonProps } from '@components/chat/SupportButton/SupportButton.props';
import { SupportButtonStyle } from '@components/chat/SupportButton/SupportButton.style';

export const SupportButton = ({
  supporting,
  onPress
}: SupportButtonProps): JSX.Element => {
  const onButtonPress = () => {
    trigger(HapticFeedbackTypes.impactMedium);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={supporting}
      onPress={onButtonPress}
      style={[
        SupportButtonStyle.button,
        supporting && SupportButtonStyle.buttonSupporting
      ]}
    >
      <Text style={SupportButtonStyle.emoji}>🫶</Text>
    </TouchableOpacity>
  );
};
