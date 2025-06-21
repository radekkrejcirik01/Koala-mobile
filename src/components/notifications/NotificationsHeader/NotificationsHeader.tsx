import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { NotificationsHeaderStyle } from '@components/notifications/NotificationsHeader/NotificationsHeader.style';

export const NotificationsHeader = (): JSX.Element => (
  <View style={NotificationsHeaderStyle.container}>
    <Text style={NotificationsHeaderStyle.title}>Messages 💬</Text>
  </View>
);
