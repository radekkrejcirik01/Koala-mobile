import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { MessageItemProps } from '@components/home/MessageItem/MessageItem.props';
import { MessageItemStyle } from '@components/home/MessageItem/MessageItem.style';

export const MessageItem = ({
  item,
  onPressMessage,
  onItemLongPress
}: MessageItemProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressMessage}
      onLongPress={onItemLongPress}
      delayLongPress={150}
      style={MessageItemStyle.buttonView}
    >
      <Text
        style={[
          MessageItemStyle.messageText,
          { color: theme.theme.colors.text }
        ]}
        numberOfLines={1}
      >
        {item.message}
      </Text>
    </TouchableOpacity>
  );
};
