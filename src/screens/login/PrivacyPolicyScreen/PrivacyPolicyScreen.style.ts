import { createStyles } from '@utils/general/createStyles';

export const usePrivacyPolicyScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 24
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800'
  },
  effectiveDate: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textTertiary
  },
  sectionTitle: {
    color: colors.text,
    marginTop: 28,
    fontSize: 18,
    fontWeight: '700'
  },
  subsectionTitle: {
    color: colors.text,
    marginTop: 16,
    fontSize: 15,
    fontWeight: '700'
  },
  paragraph: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textTertiary
  }
}));
