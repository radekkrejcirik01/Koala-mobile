import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ThemeSelectStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  description: {
    marginTop: 10,
    marginBottom: 18,
    marginHorizontal: 14,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.GRAY_200
  },
  themeCard: {
    marginBottom: 14,
    padding: 6,
    borderWidth: 2,
    borderRadius: 20
  },
  imageContainer: {
    height: 130,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 8
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
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
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.WHITE
  },
  credits: {
    marginTop: 16,
    alignItems: 'center'
  },
  creditsText: {
    fontSize: 12,
    color: COLORS.LIGHTGRAY_100
  },
  creditsHandle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_200
  }
});
