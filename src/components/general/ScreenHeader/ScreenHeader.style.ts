import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ScreenHeaderStyle = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  flex: {
    flex: 1
  },
  titleText: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  }
});
