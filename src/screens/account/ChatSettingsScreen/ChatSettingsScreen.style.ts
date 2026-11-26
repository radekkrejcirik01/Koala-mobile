import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useChatSettingsScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  profileView: {
    marginTop: 8,
    alignItems: 'center'
  },
  nameText: {
    color: colors.text,
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700'
  },
  usernameText: {
    marginTop: 2,
    fontSize: 14,
    color: colors.textSecondary
  },
  actionsView: {
    marginTop: 20,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28
  },
  actionView: {
    alignItems: 'center'
  },
  actionIconView: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionIconText: {
    color: colors.text,
    fontSize: 22
  },
  // The friend's photo opened over the screen
  photoBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK
  },
  photoImage: {
    width: '100%',
    aspectRatio: 1
  },
  photoClose: {
    position: 'absolute',
    right: 20,
    fontSize: 22,
    color: COLORS.WHITE
  },
  actionText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary
  }
}));
