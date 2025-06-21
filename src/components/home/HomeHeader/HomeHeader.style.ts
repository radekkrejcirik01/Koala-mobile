import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 25
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heartText: {
    fontSize: 26,
    color: COLORS.BLACK
  },
  title: {
    fontSize: 30,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
