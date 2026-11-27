import { createStyles } from '@utils/general/createStyles';

export const useForgotPasswordScreenStyle = createStyles((colors) => ({
  supportText: {
    marginTop: 20,
    marginHorizontal: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.textTertiary
  },
  supportLink: {
    fontWeight: '600',
    color: colors.accent
  },
  button: {
    height: 54,
    borderRadius: 16
  }
}));
