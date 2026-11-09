import { RefObject } from 'react';
import { TextInput } from 'react-native';

export interface ChatInputProps {
  message: string;
  onChangeText: (value: string) => void;
  onPressSend: () => void;
  inputRef: RefObject<TextInput>;
  onFocus: () => void;
}
