import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FormIntroStyle = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  emojiView: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 30
  },
  title: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center'
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.GRAY_200
  }
});
