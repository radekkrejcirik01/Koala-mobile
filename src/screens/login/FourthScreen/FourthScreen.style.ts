import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useFourthScreenStyle = createStyles((colors) => ({
  button: {
    height: 54,
    borderRadius: 16
  },
  privacyPolicyText: {
    marginBottom: 14,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.textTertiary
  },
  privacyPolicyLink: {
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  }
}));
