import { BaseToast, ToastConfig } from 'react-native-toast-message';
import React from 'react';

export const TOAST_CONFIG: ToastConfig = {
  success: (props) => {
    return (
      <BaseToast
        {...props}
        style={{ marginTop: 20, borderLeftWidth: 0 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14
        }}
        text2Style={{
          fontSize: 12
        }}
      />
    );
  }
};
