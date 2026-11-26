import { createStyles } from '@utils/general/createStyles';

export const useChatHeaderStyle = createStyles((colors) => ({
  container: {
    paddingHorizontal: 16,
    // Starts as far below the safe area as the Chats screen header
    paddingTop: 4,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },
  acronym: {
    borderRadius: 25
  },
  namesView: {
    marginLeft: 10
  },
  nameText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  usernameText: {
    fontSize: 12,
    color: colors.textSecondary
  }
}));
