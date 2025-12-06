import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatInputStyle = StyleSheet.create({
  replyMessageContainer: {
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 10,
    borderTopWidth: 0.2,
    borderTopColor: COLORS.LIGHTGRAY
  },
  replyingToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  replyingToText: {
    color: COLORS.GRAY_200,
    fontWeight: '500'
  },
  dismissButtonView: {
    alignSelf: 'flex-end'
  },
  replyMessageText: {
    marginTop: 2,
    fontWeight: '500'
  },
  inputContainer: {
    marginHorizontal: 5,
    paddingBottom: 7,
    flexDirection: 'row'
  },
  inputView: {
    flex: 1,
    minHeight: 42,
    marginLeft: 8,
    marginRight: 6,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 14,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 16
  },
  sendButtonView: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: COLORS.BUTTON_BLUE
  },
  sendButtonIcon: {
    right: -1
  },
  microphoneButtonView: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
