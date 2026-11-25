import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ChatInputStyle } from '@components/chat/ChatInput/ChatInput.style';
import { ChatInputProps } from '@components/chat/ChatInput/ChatInput.props';
import COLORS from '@constants/COLORS';

export const ChatInput = ({
  message,
  onChangeText,
  onPressSend,
  inputRef,
  onFocus,
  backgroundColor,
  sendButtonColor,
  reply,
  onCancelReply
}: ChatInputProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <>
      {!!reply && (
        <View
          style={[
            ChatInputStyle.replyContainer,
            {
              backgroundColor: backgroundColor ?? theme.theme.colors.background
            }
          ]}
        >
          <View
            style={[
              ChatInputStyle.replyView,
              !!sendButtonColor && { borderLeftColor: sendButtonColor }
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                ChatInputStyle.replyName,
                { color: theme.theme.colors.text }
              ]}
            >
              Replying to {reply.name}
            </Text>
            <Text numberOfLines={1} style={ChatInputStyle.replyText}>
              {reply.text}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            hitSlop={10}
            onPress={onCancelReply}
            accessibilityLabel="Cancel reply"
          >
            <Text style={ChatInputStyle.replyCancelText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          ChatInputStyle.inputContainer,
          { backgroundColor: backgroundColor ?? theme.theme.colors.background }
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={20}
          onPress={() => inputRef.current.focus()}
          style={ChatInputStyle.inputView}
        >
          <TextInput
            ref={inputRef}
            autoCorrect={false}
            multiline
            onFocus={onFocus}
            placeholder="Message..."
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            value={message}
            onChangeText={onChangeText}
            // The chat theme's color, like the send button
            selectionColor={sendButtonColor ?? COLORS.PURPLE}
            style={[ChatInputStyle.input, { color: theme.theme.colors.text }]}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={!message.trim()}
            hitSlop={10}
            onPress={onPressSend}
            style={[
              ChatInputStyle.sendButtonView,
              !!sendButtonColor && { backgroundColor: sendButtonColor }
            ]}
          >
            <Icon
              name={IconEnum.SEND}
              size={22}
              style={ChatInputStyle.sendButtonIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </>
  );
};
