import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionSliderStyle = StyleSheet.create({
  indicator: {
    // Really bad on the left, Super good on the right
    flexDirection: 'row-reverse',
    gap: 16,
    marginTop: 100
  },
  indicatorEmoji: {
    color: COLORS.BLACK,
    fontSize: 40
  }
});
