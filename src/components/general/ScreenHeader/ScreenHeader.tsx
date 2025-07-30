import React from 'react';
import { Text, View } from 'react-native';
import {
  ScreenHeaderDefaultProps,
  ScreenHeaderProps
} from '@components/general/ScreenHeader/ScreenHeader.props';
import { ScreenHeaderStyle } from '@components/general/ScreenHeader/ScreenHeader.style';
import { BackButton } from '@components/general/BackButton/BackButton';
import { useTheme } from '@contexts/ThemeContext';

export const ScreenHeader = ({
  title,
  rightComponent,
  goBack = true
}: ScreenHeaderProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <View style={ScreenHeaderStyle.container}>
      <View style={ScreenHeaderStyle.flex}>{goBack && <BackButton />}</View>
      <Text
        style={[
          ScreenHeaderStyle.titleText,
          { color: theme.theme.colors.text }
        ]}
      >
        {title}
      </Text>
      <View style={[ScreenHeaderStyle.flex, { alignItems: 'flex-end' }]}>
        {rightComponent}
      </View>
    </View>
  );
};

ScreenHeader.defaultProps = ScreenHeaderDefaultProps;
