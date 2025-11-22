import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OutboundMessageItemProps } from '@components/chat/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/chat/OutboundMessageItem/OutboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { isTextEmoji } from '@functions/isTextEmoji';

export const OutboundMessageItem = ({
  children,
  onLongPress,
  replyMessage,
  audioMessage,
  showSpace,
  isLast
}: OutboundMessageItemProps): React.JSX.Element => (
  <View style={isLast && OutboundMessageItemStyle.lastItemPadding}>
    {!!replyMessage && (
      <View style={OutboundMessageItemStyle.replyMessageView}>
        <Text style={OutboundMessageItemStyle.replyMessageText}>
          {replyMessage}
        </Text>
      </View>
    )}
    <View
      style={[
        OutboundMessageItemStyle.container,
        audioMessage && OutboundMessageItemStyle.audioMessage
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
              OutboundMessageItemStyle.messageText,
              isTextEmoji(children) && OutboundMessageItemStyle.largeText
            ]}
          >
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </View>
    {showSpace && <View style={OutboundMessageItemStyle.spaceHeight} />}
  </View>
);
