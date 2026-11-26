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
  // Same look as HomeButton, but full width
  sendButton: {
    height: 52,
    borderRadius: 70,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  sendButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold'
  }
}));
