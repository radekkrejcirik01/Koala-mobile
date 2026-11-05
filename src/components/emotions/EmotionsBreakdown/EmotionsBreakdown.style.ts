import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionsBreakdownStyle = StyleSheet.create({
  row: {
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  emojiText: {
    width: 30,
    fontSize: 20
  },
  labelText: {
    width: 80,
    fontSize: 14,
    fontWeight: '600'
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE_200
  },
  fill: {
    height: '100%',
    borderRadius: 4
  },
  countText: {
    width: 44,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600'
  },
  zero: {
    opacity: 0.4
  }
});
