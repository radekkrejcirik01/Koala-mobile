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
    // The smallest comfortable tap height, close to a one line message
    minHeight: 44,
    // With the container's margin, lined up with the bubbles of the list
    marginLeft: 5,
    marginRight: 1,
    paddingVertical: 6,
    paddingLeft: 16,
    // Keeps the send button 21 from the screen edge
    paddingRight: 15,
    // Rounded like the message bubbles
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BEIGE_200
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
    // Same as the own message bubbles
    backgroundColor: COLORS.PURPLE
  },
  sendButtonIcon: {
    right: -1
  }
});
