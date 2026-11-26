import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useShareScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  mainView: {
    flex: 1
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // Lifts the emotions above the middle, by about where the removed
    // Edit message button used to keep them
    paddingBottom: 122
  },
  selectedEmoji: {
    color: colors.text,
    fontSize: 72,
    marginBottom: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.textTertiary
  },
  messageInput: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0
  },
  // Halfway between the emotion's message and the row of emotions under it,
  // opens the message for editing
  addMessageButton: {
    marginTop: 52,
    // Takes back the room above, so the emotion and the row stay where they
    // were
    marginBottom: -44
  },
  addMessageText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.BUTTON_BLUE
  },
  addMessageHidden: {
    opacity: 0
  },
  nextButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
    // Above the safe area, so the buttons don't sit on the bottom edge
    paddingBottom: 20
  },
  // Takes the rest of the row next to Save
  nextButton: {
    flex: 1,
    width: 'auto'
  }
}));
