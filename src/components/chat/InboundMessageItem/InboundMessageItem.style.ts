import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginTop: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  marginTop: {
    marginTop: 15
  },
  audioMessage: {
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  replyMessageView: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  replyMessageText: {
    color: COLORS.GRAY_200,
    fontWeight: '500'
  },
  messageText: {
    fontSize: 15.5
  },
  largeText: {
    fontSize: 35
  }
});
