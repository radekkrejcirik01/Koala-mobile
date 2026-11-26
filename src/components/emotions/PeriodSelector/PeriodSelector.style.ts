import { createStyles } from '@utils/general/createStyles';

export const usePeriodSelectorStyle = createStyles((colors) => ({
  container: {
    marginHorizontal: 20
  },
  segmentedView: {
    padding: 3,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.surface_200
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  segmentActive: {
    backgroundColor: colors.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary
  },
  segmentTextActive: {
    color: colors.text
  },
  navigationView: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrowText: {
    paddingHorizontal: 10,
    fontSize: 26,
    fontWeight: '500',
    color: colors.text
  },
  arrowTextDisabled: {
    color: colors.border
  },
  titleText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold'
  }
}));
