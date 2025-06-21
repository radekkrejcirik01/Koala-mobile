import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TipItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  handText: {
    color: COLORS.BLACK
  },
  tipText: {
    marginLeft: 2,
    color: COLORS.BLACK
  }
});
