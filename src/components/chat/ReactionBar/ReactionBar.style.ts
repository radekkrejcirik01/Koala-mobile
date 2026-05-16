import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS.ts';

export const ReactionBarStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
    elevation: 10,
    zIndex: 9999
  },
  emojiButton: {
    marginHorizontal: 6
  },
  emoji: {
    color: COLORS.BLACK,
    fontSize: 28
  }
});
