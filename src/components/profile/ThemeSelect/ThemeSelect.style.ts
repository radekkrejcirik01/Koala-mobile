import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useThemeSelectStyle = createStyles((colors) => ({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  // Like ProfileSection's title, lined up with the cards' content
  sectionTitle: {
    marginTop: 26,
    marginBottom: 8,
    marginHorizontal: 14,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.textSecondary
  },
  appearanceCard: {
    borderRadius: 14,
    overflow: 'hidden'
  },
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
    paddingVertical: 15,
    paddingRight: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surface_300
  },
  noBorder: {
    borderBottomWidth: 0
  },
  appearanceName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500'
  },
  appearanceCheck: {
    color: COLORS.BUTTON_BLUE,
    fontSize: 17,
    fontWeight: '700'
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
    color: colors.text,
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
    borderColor: colors.border
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
    color: colors.placeholder
  },
  creditsHandle: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary
  }
}));
