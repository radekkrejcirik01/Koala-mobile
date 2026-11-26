import { createStyles } from '@utils/general/createStyles';

export const useHomeHeaderStyle = createStyles((colors) => ({
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addFriendsContainer: {},
  addFriendsView: {
    height: 45,
    width: 45,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sharedEmotionsView: {
    marginLeft: 10,
    height: 45,
    width: 45,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
