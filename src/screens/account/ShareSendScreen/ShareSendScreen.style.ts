import { createStyles } from '@utils/general/createStyles';

export const useShareSendScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  listView: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listEmptyText: {
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary
  },
  sendButtonView: {
    paddingHorizontal: 20,
    // Same as under the Share screen's buttons
    paddingBottom: 20
  },
  // HomeButton at full width
  sendButton: {
    width: 'auto'
  }
}));
