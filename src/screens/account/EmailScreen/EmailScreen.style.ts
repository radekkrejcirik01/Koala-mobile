import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmailScreenStyle = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 16
  },
  notNowText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.LIGHTGRAY_200
  }
});
