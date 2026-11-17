import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ResendCodeProps } from '@components/login/ResendCode/ResendCode.props';
import { ResendCodeStyle } from '@components/login/ResendCode/ResendCode.style';

export const ResendCode = ({
  remaining,
  onPress
}: ResendCodeProps): JSX.Element => (
  <TouchableOpacity
    hitSlop={10}
    activeOpacity={0.7}
    disabled={remaining > 0}
    onPress={onPress}
    style={ResendCodeStyle.view}
  >
    <Text
      style={[
        ResendCodeStyle.text,
        remaining > 0 && ResendCodeStyle.waitingText
      ]}
    >
      {remaining > 0 ? `Send a new code in ${remaining}s` : 'Send a new code'}
    </Text>
  </TouchableOpacity>
);
