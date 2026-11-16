import React, { JSX } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { ButtonStyle } from '@components/general/Button/Button.style';
import {
  ButtonDefaultProps,
  ButtonProps
} from '@components/general/Button/Button.props';
import COLORS from '@constants/COLORS';

export const Button = ({
  title,
  onPress,
  posting,
  disabled,
  style
}: ButtonProps): JSX.Element => (
  <TouchableOpacity
    hitSlop={10}
    activeOpacity={0.9}
    disabled={disabled || posting}
    onPress={onPress}
    style={[ButtonStyle.view, style, disabled && ButtonStyle.disabled]}
  >
    {posting ? (
      <ActivityIndicator color={COLORS.WHITE} />
    ) : (
      <Text style={ButtonStyle.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

Button.defaultProps = ButtonDefaultProps;
