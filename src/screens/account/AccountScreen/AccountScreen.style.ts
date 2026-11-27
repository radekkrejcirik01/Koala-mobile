import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useAccountScreenStyle = createStyles((_colors, isDark) => ({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    // White on dark, the red disappears on the brown card
    color: isDark ? COLORS.WHITE : COLORS.NOTIFICATION_DOT
  }
}));
