import { RefObject } from 'react';
import { TextInput } from 'react-native';

export interface ChatInputProps {
  message: string;
  onChangeText: (value: string) => void;
  onPressSend: () => void;
  onPressReply: (value: string) => void;
  onAudioRecord: (value: string) => void;
  replyMessage: string;
  inputRef: RefObject<TextInput>;
  onFocus: () => void;
  onDismissReply: () => void;
  showReplies: boolean;
}
