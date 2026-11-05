import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS.ts';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addFriendsContainer: {},
  addFriendsView: {
    height: 45,
    width: 45,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sharedEmotionsView: {
    marginLeft: 10,
    height: 45,
    width: 45,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
