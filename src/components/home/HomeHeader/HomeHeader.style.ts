import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS.ts';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addFriendsView: {
    height: 45,
    width: 45,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
