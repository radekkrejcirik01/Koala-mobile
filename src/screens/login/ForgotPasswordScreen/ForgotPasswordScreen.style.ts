import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ForgotPasswordScreenStyle = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.LIGHTGRAY_200
  },
  email: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '700'
  },
  button: {
    height: 54,
    borderRadius: 16
  }
});
