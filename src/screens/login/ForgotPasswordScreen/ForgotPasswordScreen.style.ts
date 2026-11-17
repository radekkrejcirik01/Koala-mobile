import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ForgotPasswordScreenStyle = StyleSheet.create({
  supportText: {
    marginTop: 20,
    marginHorizontal: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: COLORS.LIGHTGRAY_200
  },
  supportLink: {
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  },
  button: {
    height: 54,
    borderRadius: 16
  }
});
