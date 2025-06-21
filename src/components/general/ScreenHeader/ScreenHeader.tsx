import React from 'react';
import { Text, View } from 'react-native';
import {
  ScreenHeaderDefaultProps,
  ScreenHeaderProps
} from '@components/general/ScreenHeader/ScreenHeader.props';
import { ScreenHeaderStyle } from '@components/general/ScreenHeader/ScreenHeader.style';
import { BackButton } from '@components/general/BackButton/BackButton';

export const ScreenHeader = ({
  title,
  rightComponent
}: ScreenHeaderProps): React.JSX.Element => (
  <View style={ScreenHeaderStyle.container}>
    <View style={ScreenHeaderStyle.flex}>
      <BackButton />
    </View>
    <Text style={ScreenHeaderStyle.titleText}>{title}</Text>
    <View style={[ScreenHeaderStyle.flex, { alignItems: 'flex-end' }]}>
      {rightComponent}
    </View>
  </View>
);

ScreenHeader.defaultProps = ScreenHeaderDefaultProps;
