import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { TipItem } from '@components/home/TipItem/TipItem';
import { CanHelpStyle } from '@components/home/CanHelp/CanHelp.style';
import { CanHelpProps } from '@components/home/CanHelp/CanHelp.props';
import { useTheme } from '@contexts/ThemeContext';

export const CanHelp = ({ tip1, tip2 }: CanHelpProps): JSX.Element => {
  const theme = useTheme();

  if (!tip1 && !tip2) {
    return null;
  }

  return (
    <View style={CanHelpStyle.container}>
      <Text
        style={[CanHelpStyle.titleText, { color: theme.theme.colors.text }]}
      >
        Can help:
      </Text>
      {!!tip1 && <TipItem tip={tip1} style={CanHelpStyle.marginTop10} />}
      {!!tip2 && <TipItem tip={tip2} style={CanHelpStyle.marginTop5} />}
    </View>
  );
};
