import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ResendCodeStyle = StyleSheet.create({
  view: {
    marginTop: 16,
    marginLeft: 4,
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  },
  waitingText: {
    color: COLORS.LIGHTGRAY_200
  }
});
