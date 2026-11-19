import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareScreenStyle = StyleSheet.create({
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
    color: COLORS.BLACK,
    fontSize: 72,
    marginBottom: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.LIGHTGRAY_200
  },
  messageInput: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0
  },
  nextButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 30,
    marginBottom: 30
  },
  // Takes the rest of the row next to Log only
  nextButton: {
    flex: 1,
    width: undefined
  }
});
