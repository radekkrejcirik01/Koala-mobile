import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useAuthInputStyle = createStyles((colors, isDark) => ({
  container: {
    marginTop: 12
  },
  field: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    color: colors.text,
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500'
  },
  toggle: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent
  },
  message: {
    marginTop: 10,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textTertiary
  },
  // White on dark, the red gets lost on the brown background
  errorMessage: {
    color: isDark ? COLORS.WHITE : COLORS.EMOTION_MISERABLE
  }
}));
