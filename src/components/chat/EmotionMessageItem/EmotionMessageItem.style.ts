import COLORS from '@constants/COLORS';
import { TIME_WIDTH } from '@components/chat/MessageItem/MessageItem.style';
import { createStyles } from '@utils/general/createStyles';

export const useEmotionMessageItemStyle = createStyles((colors, isDark) => ({
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
    borderRadius: 24,
    backgroundColor: isDark ? COLORS.TRANSPARENT : COLORS.BEIGE
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 21,
    // A plain pill on dark, the ring would show as a halo
    backgroundColor: isDark ? colors.bubble : colors.surface_200
  },
  // Plain white without the ring, a touch smaller than the beige pill
  badgeOuterWhite: {
    backgroundColor: COLORS.TRANSPARENT
  },
  // Stays near white on dark too, so waiting for support stands out
  badgeWhite: {
    backgroundColor: isDark ? colors.text : colors.card
  },
  emojiText: {
    color: colors.text,
    fontSize: 20,
    marginRight: 7
  },
  messageText: {
    flexShrink: 1,
    fontSize: 13.5,
    color: colors.textSecondary
  },
  messageTextWhite: {
    color: COLORS.GRAY_200
  },
  // Over the pill's lower right corner, pointing at it
  tapHint: {
    position: 'absolute',
    right: -14,
    bottom: -22,
    color: colors.text,
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
    color: colors.textSecondary,
    textAlign: 'center'
  }
}));
