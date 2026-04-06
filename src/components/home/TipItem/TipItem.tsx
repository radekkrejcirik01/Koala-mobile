import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { TipItemStyle } from '@components/home/TipItem/TipItem.style';
import {
  TipItemDefaultProps,
  TipItemProps
} from '@components/home/TipItem/TipItem.props';

export const TipItem = ({ tip, style }: TipItemProps): JSX.Element => {
  const theme = useTheme();

  return (
    <View style={[TipItemStyle.container, style]}>
      <Text>💡</Text>
      <Text style={[TipItemStyle.tipText, { color: theme.theme.colors.text }]}>
        {tip}
      </Text>
    </View>
  );
};

TipItem.defaultProps = TipItemDefaultProps;
