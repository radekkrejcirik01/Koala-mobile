import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatInputStyle = StyleSheet.create({
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
  }
});
