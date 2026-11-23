import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TIME_WIDTH = 60;
export const PHOTO_SIZE = 32;
const PHOTO_GAP = 8;
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
