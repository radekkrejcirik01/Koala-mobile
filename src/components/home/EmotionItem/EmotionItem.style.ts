import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionItemStyle = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    borderWidth: 2,
    backgroundColor: COLORS.WHITE_200
  },
  emoji: {
    fontSize: 32
  }
});
