import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsButtonStyle } from '@components/home/NotificationsButton/NotificationsButton.style';

export const NotificationsButton = (): JSX.Element => {
  const { unseenNotifications } = useSelector(
    (state: ReducerProps) => state.notifications
  );

  return (
    <View>
      <Text style={NotificationsButtonStyle.text}>💬</Text>
      <Badge value={unseenNotifications} />
    </View>
  );
};
