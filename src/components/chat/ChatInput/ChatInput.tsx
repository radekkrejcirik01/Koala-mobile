import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
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
  onFocus
}: ChatInputProps): React.JSX.Element => {
  const theme = useTheme();

  return (
    <View
      style={[
        ChatInputStyle.inputContainer,
        { backgroundColor: theme.theme.colors.background }
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
          selectionColor={COLORS.BUTTON_BLUE}
          style={[ChatInputStyle.input, { color: theme.theme.colors.text }]}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={!message.trim()}
          hitSlop={10}
          onPress={onPressSend}
          style={ChatInputStyle.sendButtonView}
        >
          <Icon
            name={IconEnum.SEND}
            size={22}
            style={ChatInputStyle.sendButtonIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
