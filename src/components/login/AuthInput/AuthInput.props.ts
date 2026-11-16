import { TextInputProps } from 'react-native';

export interface AuthInputProps extends TextInputProps {
  error?: string;
  hint?: string;
  password?: boolean;
}
