import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { PHOTO_SIZE } from '@components/chat/MessageItem/MessageItem.style';

export const DOT_SIZE = 7;

export const TypingIndicatorStyle = StyleSheet.create({
  // Takes over the bottom padding of the last message. Spaced like a message
  // of the friend, the room after an own message comes from that message
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 2,
    paddingBottom: 8
  },
  photoView: {
    width: PHOTO_SIZE,
    marginRight: 8
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    // As tall and round as a one line message, the message replaces it
    height: 40.5,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: COLORS.BEIGE_200
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: COLORS.GRAY_200
  }
});
