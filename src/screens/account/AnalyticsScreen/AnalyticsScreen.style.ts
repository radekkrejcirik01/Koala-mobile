import { createStyles } from '@utils/general/createStyles';

export const useAnalyticsScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 8
  },
  card: {
    marginTop: 16,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.surface_200
  },
  totalText: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold'
  },
  totalLabelText: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 6,
    marginHorizontal: 20,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.textSecondary
  },
  stale: {
    opacity: 0.5
  },
  listEmptyText: {
    marginTop: 30,
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary
  }
}));
