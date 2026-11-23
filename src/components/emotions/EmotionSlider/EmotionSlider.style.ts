import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionSliderStyle = StyleSheet.create({
  indicator: {
    // Awful on the left, Super good on the right
    flexDirection: 'row-reverse',
    gap: 16,
    marginTop: 100
  },
  // Below the row, positioned absolutely so nothing shifts
  swipeHint: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    textAlign: 'center',
    marginTop: 45,
    color: COLORS.BLACK,
    fontSize: 36
  },
  indicatorEmoji: {
    color: COLORS.BLACK,
    fontSize: 40
  }
});
