import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatListStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  // Bubbles sit close to the edges, like in other chat apps, sent ones the
  // closest
  scrollViewContainer: {
    paddingLeft: 14,
    paddingRight: 8
  },
  separatorText: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_200
  },
  // Its time always sits right above it, the gap is kept below, as much as
  // above the time
  emotionView: {
    paddingBottom: 24
  },
  // The message opened from search or shared emotions
  highlight: {
    borderRadius: 12,
    backgroundColor: COLORS.BUTTON_BLUE_100
  },
  // Hidden while its copy is lifted into the menu
  lifted: {
    opacity: 0
  },
  // The emotion's copy in the menu, centred like in the chat
  menuEmotion: {
    alignItems: 'center'
  },
  // The time under it already has its room above
  emotionViewBeforeTime: {
    paddingBottom: 0
  },
  // The pill stands apart from the input, more room than under a message
  lastEmotionView: {
    paddingBottom: 40
  },
  lastReadView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 24,
    paddingHorizontal: 8
  },
  lastReadLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.PURPLE,
    opacity: 0.5
  },
  lastReadText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.PURPLE
  }
});
