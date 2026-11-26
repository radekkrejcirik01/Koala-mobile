import { createStyles } from '@utils/general/createStyles';

export const PHOTO_SIZE = 104;

export const useProfileScreenStyle = createStyles((colors) => ({
  screen: {
    flex: 1
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  container: {
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center'
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    borderRadius: PHOTO_SIZE / 2
  },
  photoBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card
  },
  photoBadgeText: {
    color: colors.text,
    fontSize: 14
  },
  namesView: {
    marginTop: 14,
    alignItems: 'center'
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700'
  },
  usernamePill: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.surface_200
  },
  username: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600'
  },
  footerText: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: colors.placeholder
  }
}));
