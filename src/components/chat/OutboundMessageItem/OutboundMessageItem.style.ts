import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginTop: 2,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: COLORS.PURPLE,
    alignSelf: 'flex-end'
  },
  marginTop: {
    marginTop: 15
  },
  audioMessage: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: COLORS.WHITE
  },
  replyMessageView: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-end'
  },
  replyMessageText: {
    color: COLORS.GRAY_200,
    fontWeight: '500'
  },
  messageText: {
    fontSize: 15.5,
    color: COLORS.WHITE
  },
  largeText: {
    fontSize: 35
  },
  spaceHeight: {
    height: 5
  },
  lastItemPadding: {
    paddingBottom: 20
  }
});
