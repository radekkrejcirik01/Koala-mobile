import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useShareScreenStyle = createStyles((colors, isDark) => ({
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
    // White on dark, the beige-grey looks dull on the brown background
    color: isDark ? COLORS.WHITE : colors.textTertiary
  },
  // Halfway between the emotion's message and the row of emotions under it,
  // turns into the note input
  addMessageButton: {
    marginTop: 52,
    // Takes back the room above, so the emotion and the row stay where they
    // were
    marginBottom: -44
  },
  addMessageText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent
  },
  // In the button's place, a field like the other inputs. Takes back the room
  // above like the button, so the emotion moves as little as possible
  noteInput: {
    alignSelf: 'stretch',
    maxHeight: 110,
    marginTop: 24,
    marginBottom: -36,
    paddingTop: 11,
    paddingBottom: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface
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
