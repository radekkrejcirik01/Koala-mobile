import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useInviteItemStyle = createStyles((colors) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  usernameText: {
    color: colors.text,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '500'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  acceptButtonView: {
    height: 35,
    width: 70,
    borderRadius: 10,
    backgroundColor: COLORS.BUTTON_BLUE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  acceptButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold'
  },
  removeButtonView: {
    height: 35,
    width: 35,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
