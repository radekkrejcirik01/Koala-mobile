import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsButtonStyle } from '@components/home/NotificationsButton/NotificationsButton.style';
import { NotificationsButtonProps } from '@components/home/NotificationsButton/NotificationsButton.props';

export const NotificationsButton = ({
  onPress
}: NotificationsButtonProps): JSX.Element => {
  const { unseenNotifications } = useSelector(
    (state: ReducerProps) => state.notifications
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      hitSlop={10}
      onPress={onPress}
      style={NotificationsButtonStyle.view}
    >
      <Text style={NotificationsButtonStyle.text}>💬</Text>
      <Badge value={unseenNotifications} />
    </TouchableOpacity>
  );
};
