import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { TIME_WIDTH } from '@components/chat/MessageItem/MessageItem.style';

export const EmotionMessageItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '75%'
  },
  // The badge with the support confirmation under it
  content: {
    flexShrink: 1,
    alignItems: 'center'
  },
  // A beige ring around a darker beige, like the old emotion badge
  badgeOuter: {
    padding: 3,
    borderRadius: 23,
    backgroundColor: COLORS.BEIGE
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_200
  },
  // Plain white without the ring, a touch smaller than the beige pill
  badgeOuterWhite: {
    backgroundColor: COLORS.TRANSPARENT
  },
  badgeWhite: {
    backgroundColor: COLORS.WHITE
  },
  emojiText: {
    color: COLORS.BLACK,
    fontSize: 19,
    marginRight: 7
  },
  messageText: {
    flexShrink: 1,
    fontSize: 13,
    color: COLORS.GRAY_200
  },
  // Over the pill's lower right corner, pointing at it
  tapHint: {
    position: 'absolute',
    right: -14,
    bottom: -22,
    color: COLORS.BLACK,
    fontSize: 30
  },
  // Fills the row so the time sits at the right edge, like on messages
  row: {
    alignSelf: 'stretch'
  },
  timeView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: TIME_WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  lifted: {
    opacity: 0
  },
  // The support confirmation under the badge, as it was before
  supportedText: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.GRAY_200,
    textAlign: 'center'
  }
});
