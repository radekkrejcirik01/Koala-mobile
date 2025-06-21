import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ScreenHeaderStyle = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  flex: {
    flex: 1
  },
  titleText: {
    fontSize: 16,
    color: COLORS.BLACK_75,
    fontWeight: 'bold'
  }
});
