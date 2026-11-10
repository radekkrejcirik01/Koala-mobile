import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TIME_WIDTH = 60;

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
  container: {
    maxWidth: '70%',
    minWidth: 40,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  outboundContainer: {
    backgroundColor: COLORS.PURPLE
  },
  messageText: {
    fontSize: 15.5,
    lineHeight: 20
  },
  outboundMessageText: {
    color: COLORS.WHITE
  },
  largeText: {
    fontSize: 35,
    lineHeight: 42
  },
  spaceHeight: {
    height: 10
  },
  lastItemPadding: {
    paddingBottom: 20
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
