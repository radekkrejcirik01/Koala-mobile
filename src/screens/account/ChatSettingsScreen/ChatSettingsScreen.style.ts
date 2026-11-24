import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatSettingsScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  profileView: {
    marginTop: 8,
    alignItems: 'center'
  },
  nameText: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700'
  },
  usernameText: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.GRAY_200
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
    color: COLORS.GRAY_200
  }
});
