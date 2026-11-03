import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ThemeSelectStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  themes: {
    marginTop: 26
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderWidth: 2,
    borderRadius: 14
  },
  imageContainer: {
    width: 84,
    height: 84,
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  footerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 6
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.LIGHTGRAY
  },
  radioSelected: {
    borderColor: COLORS.BUTTON_BLUE,
    backgroundColor: COLORS.BUTTON_BLUE
  },
  radioCheck: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.WHITE
  },
  credits: {
    marginTop: 16,
    alignItems: 'center'
  },
  creditsText: {
    fontSize: 14,
    color: COLORS.LIGHTGRAY_100
  },
  creditsHandle: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_200
  }
});
