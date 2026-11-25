import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TIME_WIDTH = 60;
export const PHOTO_SIZE = 32;
export const PHOTO_GAP = 8;
// Corners between messages of a group, on the sender's side
const JOINED_RADIUS = 4;

export const MessageItemStyle = StyleSheet.create({
  alignEnd: {
    alignSelf: 'flex-end'
  },
  alignStart: {
    alignSelf: 'flex-start'
  },
  bubbleRow: {
    marginTop: 2
  },
  // The photo sits at the bottom of the bubble
  inboundRow: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  photoView: {
    width: PHOTO_SIZE,
    marginRight: PHOTO_GAP
  },
  container: {
    maxWidth: '70%',
    minWidth: 40,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 22
  },
  outboundContainer: {
    backgroundColor: COLORS.PURPLE
  },
  inboundContainer: {
    backgroundColor: COLORS.BEIGE_200
  },
  joinedTopRight: {
    borderTopRightRadius: JOINED_RADIUS
  },
  joinedBottomRight: {
    borderBottomRightRadius: JOINED_RADIUS
  },
  joinedTopLeft: {
    borderTopLeftRadius: JOINED_RADIUS
  },
  joinedBottomLeft: {
    borderBottomLeftRadius: JOINED_RADIUS
  },
  // A standalone emoji shows on its own, without the bubble and its padding
  emojiContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  // The quoted message above the reply, faded so the reply stands out
  quoteView: {
    maxWidth: '65%',
    marginTop: 4,
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: COLORS.BEIGE_200,
    opacity: 0.6
  },
  // Lined up with the inbound bubble, after the photo's room
  inboundQuoteView: {
    alignSelf: 'flex-start',
    marginLeft: PHOTO_SIZE + PHOTO_GAP
  },
  // The reply's bubble covers its bottom edge, a big emoji has no bubble
  quoteViewTucked: {
    marginBottom: -10,
    paddingBottom: 17
  },
  quoteName: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600'
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 18
  },
  quoteDeletedText: {
    fontStyle: 'italic'
  },
  messageText: {
    fontSize: 15.75,
    lineHeight: 20.5
  },
  outboundMessageText: {
    color: COLORS.WHITE
  },
  largeText: {
    fontSize: 44,
    lineHeight: 52
  },
  spaceHeight: {
    height: 10
  },
  lastItemPadding: {
    paddingBottom: 8
  },
  reactionView: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 8,
    marginTop: -10,
    marginBottom: 5
  },
  inboundReactionView: {
    marginLeft: PHOTO_SIZE + PHOTO_GAP + 8
  },
  reactionText: {
    fontSize: 12,
    color: COLORS.BLACK
  },
  timeView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: TIME_WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});
