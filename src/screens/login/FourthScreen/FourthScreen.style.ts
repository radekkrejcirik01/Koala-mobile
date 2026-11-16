import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FourthScreenStyle = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 16
  },
  privacyPolicyText: {
    marginBottom: 14,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: COLORS.LIGHTGRAY_200
  },
  privacyPolicyLink: {
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  }
});
