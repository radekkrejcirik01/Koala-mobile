import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginTop: 2,
    paddingVertical: 9,
    paddingHorizontal: 12,
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
    fontSize: 14.5,
    color: COLORS.WHITE,
    fontWeight: '500'
  },
  largeText: {
    fontSize: 35
  },
  sendingText: {
    margin: 2,
    fontSize: 12,
    color: COLORS.LIGHTGRAY_100,
    alignSelf: 'flex-end',
    fontWeight: '500'
  },
  deliveredText: {
    margin: 2,
    fontSize: 12,
    color: COLORS.LIGHTGRAY_100,
    alignSelf: 'flex-end',
    fontWeight: '600'
  }
});
