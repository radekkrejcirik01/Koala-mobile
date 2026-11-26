import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useChatInputStyle = createStyles((colors) => ({
  inputContainer: {
    marginHorizontal: 5,
    paddingBottom: 7,
    flexDirection: 'row'
  },
  inputView: {
    flex: 1,
    // The smallest comfortable tap height, close to a one line message
    minHeight: 44,
    // With the container's margin, lined up with the bubbles of the list
    marginLeft: 5,
    marginRight: 1,
    paddingVertical: 6,
    paddingLeft: 16,
    // Keeps the send button 21 from the screen edge
    paddingRight: 15,
    // Rounded like the message bubbles
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bubble
  },
  input: {
    color: colors.text,
    flex: 1,
    paddingLeft: 2,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 16
  },
  sendButtonView: {
    padding: 5,
    borderRadius: 20,
    // Same as the own message bubbles
    backgroundColor: COLORS.PURPLE
  },
  // Lined up with the input pill, the send button's side keeps the cancel
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 22,
    paddingTop: 8,
    paddingBottom: 10
  },
  replyView: {
    flex: 1,
    paddingVertical: 4,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.PURPLE
  },
  replyName: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600'
  },
  replyText: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textSecondary
  },
  replyCancelText: {
    marginLeft: 16,
    fontSize: 18,
    color: colors.textSecondary
  },
  sendButtonIcon: {
    right: -1
  }
}));
