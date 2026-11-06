import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionItemStyle = StyleSheet.create({
  container: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38
  },
  emoji: {
    color: COLORS.BLACK,
    fontSize: 36
  }
});
