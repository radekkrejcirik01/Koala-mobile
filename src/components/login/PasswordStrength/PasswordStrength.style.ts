import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PasswordStrengthStyle = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: 6
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.WHITE_200
  },
  label: {
    width: 70,
    marginLeft: 12,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right'
  }
});
