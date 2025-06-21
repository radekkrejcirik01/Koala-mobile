import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 15
  },
  friendsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  friendsText: {
    fontSize: 22,
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
