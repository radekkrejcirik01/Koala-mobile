import React from 'react';
import {
  KeyboardAvoidingView as KeyboardAvoidingViewDefault,
  Platform
} from 'react-native';
import {
  KeyboardAvoidingViewDefaultProps,
  KeyboardAvoidingViewProps
} from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView.props';

export const KeyboardAvoidingView = ({
  keyboardVerticalOffset,
  ...props
}: KeyboardAvoidingViewProps): JSX.Element => (
  <KeyboardAvoidingViewDefault
    behavior={Platform.OS === 'ios' ? 'position' : 'height'}
    keyboardVerticalOffset={40}
    {...props}
  />
);

KeyboardAvoidingView.defaultProps = KeyboardAvoidingViewDefaultProps;
