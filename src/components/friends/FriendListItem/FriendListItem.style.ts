import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendListItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  profilePhoto: {
    marginRight: 12,
    borderRadius: 9
  },
  profilePhotoShape: {
    borderRadius: 9
  },
  nameText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500'
  },
  checkSquare: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.LIGHTGRAY_100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkSquareSelected: {
    borderColor: COLORS.BUTTON_BLUE,
    backgroundColor: COLORS.BUTTON_BLUE
  },
  checkMark: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontWeight: 'bold'
  }
});
