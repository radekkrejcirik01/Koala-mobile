import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MessageItemProps } from '@components/home/MessageItem/MessageItem.props';
import { MessageItemStyle } from '@components/home/MessageItem/MessageItem.style';
import { useTheme } from '@contexts/ThemeContext';

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
      style={[
        MessageItemStyle.buttonView,
        { borderColor: theme.isDark ? '#ffffff30' : '#00000030' }
      ]}
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
