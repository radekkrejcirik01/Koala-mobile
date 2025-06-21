import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
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
    marginTop: 15,
    fontSize: 30,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
