import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PHOTO_SIZE = 104;

export const ProfileScreenStyle = StyleSheet.create({
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
    backgroundColor: COLORS.WHITE
  },
  photoBadgeText: {
    fontSize: 14
  },
  namesView: {
    marginTop: 14,
    alignItems: 'center'
  },
  name: {
    fontSize: 26,
    fontWeight: '700'
  },
  usernamePill: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.WHITE_200
  },
  username: {
    fontSize: 14,
    color: COLORS.GRAY_200,
    fontWeight: '600'
  },
  footerText: {
    marginTop: 30,
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.LIGHTGRAY_100
  }
});
