import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharedEmotionItemStyle = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  emojiView: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_200
  },
  emojiText: {
    color: COLORS.BLACK,
    fontSize: 22
  },
  textView: {
    flex: 1,
    marginLeft: 14
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600'
  },
  timeText: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.GRAY_200
  }
});
