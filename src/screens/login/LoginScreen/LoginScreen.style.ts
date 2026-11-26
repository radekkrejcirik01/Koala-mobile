import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useLoginScreenStyle = createStyles((colors) => ({
  button: {
    height: 54,
    borderRadius: 16
  },
  forgotPasswordView: {
    marginTop: 14,
    marginRight: 4,
    alignSelf: 'flex-end'
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  },
  signUpText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.textTertiary
  },
  signUpLink: {
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  }
}));
