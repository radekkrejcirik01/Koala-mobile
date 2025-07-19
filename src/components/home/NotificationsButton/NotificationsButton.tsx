import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsButtonStyle } from '@components/home/NotificationsButton/NotificationsButton.style';

export const NotificationsButton = ({
  focused
}: {
  focused: boolean;
}): JSX.Element => {
  const { unseenNotifications } = useSelector(
    (state: ReducerProps) => state.notifications
  );

  return (
    <View>
      <Text
        style={[
          NotificationsButtonStyle.text,
          { fontSize: focused ? 26 : 24, opacity: focused ? 1 : 0.8 }
        ]}
      >
        💬
      </Text>
      <Badge value={unseenNotifications} />
    </View>
  );
};
