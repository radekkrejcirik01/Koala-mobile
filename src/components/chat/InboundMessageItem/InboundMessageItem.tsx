import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InboundMessageItemProps } from '@components/chat/InboundMessageItem/InboundMessageItem.props';
import { InboundMessageItemStyle } from '@components/chat/InboundMessageItem/InboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { isTextEmoji } from '@functions/isTextEmoji';
import { useTheme } from '@contexts/ThemeContext';

export const InboundMessageItem = ({
  children,
  onLongPress,
  replyMessage,
  audioMessage
}: InboundMessageItemProps): React.JSX.Element => {
  const theme = useTheme();
  return (
    <View>
      {!!replyMessage && (
        <View style={InboundMessageItemStyle.replyMessageView}>
          <Text style={InboundMessageItemStyle.replyMessageText}>
            {replyMessage}
          </Text>
        </View>
      )}
      <View
        style={[
          InboundMessageItemStyle.container,
          { backgroundColor: theme.theme.colors.surface },
          audioMessage && {
            ...InboundMessageItemStyle.audioMessage,
            backgroundColor: theme.theme.colors.surface
          }
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={120}
          onLongPress={onLongPress}
        >
          {audioMessage ? (
            <AudioMessageItem audioMessage={audioMessage} />
          ) : (
            <Text
              style={[
                InboundMessageItemStyle.messageText,
                { color: theme.theme.colors.text },
                isTextEmoji(children) && InboundMessageItemStyle.largeText
              ]}
            >
              {children}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
