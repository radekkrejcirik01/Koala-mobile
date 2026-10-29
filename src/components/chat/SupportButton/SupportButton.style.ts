import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SupportButtonStyle = StyleSheet.create({
  button: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_200
  },
  buttonSupporting: {
    backgroundColor: COLORS.WHITE_300
  },
  emoji: {
    fontSize: 36
  }
});
