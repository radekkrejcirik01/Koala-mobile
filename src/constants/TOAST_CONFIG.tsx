import { BaseToast, ToastConfig } from 'react-native-toast-message';
import React from 'react';
import { darkTheme, lightTheme } from '../theme';

// Rendered outside the store, so it takes the scheme instead of the theme
export const getToastConfig = (isDark: boolean): ToastConfig => ({
  success: (props) => {
    const { colors } = isDark ? darkTheme : lightTheme;
    return (
      <BaseToast
        {...props}
        style={{
          marginTop: 20,
          borderLeftWidth: 0,
          backgroundColor: colors.card
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          color: colors.text
        }}
        text2Style={{
          fontSize: 12,
          color: colors.textSecondary
        }}
      />
    );
  }
});
