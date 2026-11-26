import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useResendCodeStyle = createStyles((colors) => ({
  view: {
    marginTop: 16,
    marginLeft: 4,
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  },
  waitingText: {
    color: colors.textTertiary
  }
}));
