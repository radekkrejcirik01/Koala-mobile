import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AddButtonProps } from '@components/general/AddButton/AddButton.props';
import { AddButtonStyle } from '@components/general/AddButton/AddButton.style';

export const AddButton = ({ onPress }: AddButtonProps): JSX.Element => (
  <TouchableOpacity activeOpacity={0.9} hitSlop={10} onPress={onPress}>
    <Text style={AddButtonStyle.text}>Add +</Text>
  </TouchableOpacity>
);
