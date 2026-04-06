import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';

export const NotificationsBadge = (): JSX.Element => {
  const { unseenNotifications } = useSelector(
    (state: ReducerProps) => state.notifications
  );

  return <Badge value={unseenNotifications} />;
};
