import { createStyles } from '@utils/general/createStyles';

export const useChatsScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: 5,
    paddingBottom: 50,
    paddingHorizontal: 10
  },
  listEmptyText: {
    marginTop: 100,
    color: colors.textSecondary,
    alignSelf: 'center',
    fontWeight: '500'
  }
}));
