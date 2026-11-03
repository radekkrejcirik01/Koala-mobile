import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SendButtonStyle = StyleSheet.create({
  view: {
    height: 50,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.BUTTON_BLUE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});
