import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionMessageItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '90%'
  },
  // A beige ring around a darker beige, like the old emotion badge
  badgeOuter: {
    flexShrink: 1,
    padding: 3,
    borderRadius: 23,
    backgroundColor: COLORS.BEIGE
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_200
  },
  emojiText: {
    color: COLORS.BLACK,
    fontSize: 19,
    marginRight: 7
  },
  messageText: {
    flexShrink: 1,
    fontSize: 13,
    color: COLORS.GRAY_200
  },
  supportView: {
    marginLeft: 6
  },
  // Sits on the badge's top right corner, a lighter beige than the chat
  supportedView: {
    position: 'absolute',
    top: -8,
    right: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE_200,
    backgroundColor: COLORS.BEIGE_100
  },
  supportedText: {
    fontSize: 12
  }
});
