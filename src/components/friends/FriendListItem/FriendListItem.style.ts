import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useFriendListItemStyle = createStyles((colors) => ({
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
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '500'
  },
  checkSquare: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.placeholder,
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
}));
