import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';

export const ChatsBadge = (): JSX.Element => {
  const { unreadChats } = useSelector(
    (state: ReducerProps) => state.notifications
  );

  return <Badge value={unreadChats} />;
};
