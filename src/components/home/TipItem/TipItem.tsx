import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { TipItemStyle } from '@components/home/TipItem/TipItem.style';
import {
  TipItemDefaultProps,
  TipItemProps
} from '@components/home/TipItem/TipItem.props';

export const TipItem = ({ tip, style }: TipItemProps): JSX.Element => (
  <View style={[TipItemStyle.container, style]}>
    <Text style={TipItemStyle.handText}>👉</Text>
    <Text style={TipItemStyle.tipText}>{tip}</Text>
  </View>
);

TipItem.defaultProps = TipItemDefaultProps;
