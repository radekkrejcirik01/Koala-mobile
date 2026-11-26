import React, { forwardRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';
import { AuthInputProps } from '@components/login/AuthInput/AuthInput.props';
import { useAuthInputStyle } from '@components/login/AuthInput/AuthInput.style';
import COLORS from '@constants/COLORS';

export const AuthInput = forwardRef<TextInput, AuthInputProps>(
  ({ error, hint, password, ...props }, ref) => {
    const AuthInputStyle = useAuthInputStyle();
    const theme = useTheme();

    const [hidden, setHidden] = useState<boolean>(true);

    const message = error || hint;

    return (
      <View style={AuthInputStyle.container}>
        <View
          style={[
            AuthInputStyle.field,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <TextInput
            ref={ref}
            autoCorrect={false}
            secureTextEntry={password && hidden}
            placeholderTextColor={theme.theme.colors.placeholder}
            selectionColor={COLORS.BUTTON_BLUE}
            style={[AuthInputStyle.input, { color: theme.theme.colors.text }]}
            {...props}
          />
          {password && (
            <TouchableOpacity
              hitSlop={12}
              activeOpacity={0.7}
              onPress={() => setHidden((value) => !value)}
            >
              <Text style={AuthInputStyle.toggle}>
                {hidden ? 'Show' : 'Hide'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {!!message && (
          <Animated.Text
            key={message}
            entering={FadeIn.duration(200)}
            style={[
              AuthInputStyle.message,
              !!error && AuthInputStyle.errorMessage
            ]}
          >
            {message}
          </Animated.Text>
        )}
      </View>
    );
  }
);
