import { RefObject } from 'react';
import { TextInput } from 'react-native';

export interface ChatInputProps {
  message: string;
  onChangeText: (value: string) => void;
  onPressSend: () => void;
  inputRef: RefObject<TextInput>;
  onFocus: () => void;
  // The chat theme's colors, the app's defaults when not set
  backgroundColor?: string;
  sendButtonColor?: string;
}
