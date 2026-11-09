import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

// Same beige ring around a darker beige as the emotion badge
export const SupportButtonStyle = StyleSheet.create({
  buttonOuter: {
    padding: 3,
    borderRadius: 22,
    backgroundColor: COLORS.BEIGE
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_200
  },
  emoji: {
    color: COLORS.BLACK,
    fontSize: 18
  }
});
