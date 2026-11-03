import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChangePasswordScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 50,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '500'
  },
  separator: {
    marginLeft: 14,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.WHITE_300
  },
  button: {
    width: 'auto',
    height: 50,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 14
  }
});
