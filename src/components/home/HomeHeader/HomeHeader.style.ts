import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 15
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  }
});
