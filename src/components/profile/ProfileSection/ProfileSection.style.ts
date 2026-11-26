import { createStyles } from '@utils/general/createStyles';

export const useProfileSectionStyle = createStyles((colors) => ({
  container: {
    marginTop: 26
  },
  title: {
    marginBottom: 8,
    marginHorizontal: 30,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.textSecondary
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden'
  },
  footer: {
    marginTop: 8,
    marginHorizontal: 30,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary
  }
}));
