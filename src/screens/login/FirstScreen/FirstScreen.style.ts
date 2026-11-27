import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useFirstScreenStyle = createStyles((colors, isDark) => ({
  background: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1
  },
  // Same height as HomeHeader so the buttons sit where they do on home
  header: {
    height: 55,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text
  },
  subtitleText: {
    marginTop: 20,
    paddingHorizontal: 40,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
    // White on dark, the beige-grey looks dull on the brown background
    color: isDark ? COLORS.WHITE : colors.textTertiary
  }
}));
