import { createStyles } from '@utils/general/createStyles';

export const useChatEmotionsScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  segmentedView: {
    marginHorizontal: 16,
    marginBottom: 8,
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
  contentContainer: {
    flexGrow: 1,
    paddingTop: 8
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 15,
    color: colors.textSecondary
  }
}));
