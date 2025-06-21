import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { SharedScreenHeaderStyle } from '@components/chat/SharedScreenHeader/SharedScreenHeader.style';
import { BackButton } from '@components/general/BackButton/BackButton';

export const SharedScreenHeader = (): JSX.Element => (
  <View style={SharedScreenHeaderStyle.container}>
    <BackButton />
    <Text style={SharedScreenHeaderStyle.titleText}>All shared</Text>
  </View>
);
