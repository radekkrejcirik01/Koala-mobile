import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  emotionView: {
    alignItems: 'center',
    paddingTop: 110
  },
  emotionText: {
    fontSize: 80,
    textAlign: 'center',
    opacity: 0.85
  },
  emotionMessageText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16
  },
  emotionBadgeOuter: {
    position: 'absolute',
    alignSelf: 'center',
    maxWidth: '90%',
    padding: 3,
    borderRadius: 23,
    backgroundColor: COLORS.BEIGE,
    elevation: 10,
    zIndex: 9999
  },
  emotionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 20
  },
  emotionBadgeTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.WHITE_200
  },
  emotionBadgeEmoji: {
    fontSize: 19,
    marginRight: 7
  },
  emotionBadgeText: {
    flexShrink: 1,
    fontSize: 13,
    color: COLORS.GRAY_200
  },
  supportButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120
  },
  supportHintText: {
    marginTop: 14,
    fontSize: 13,
    color: COLORS.GRAY_200,
    textAlign: 'center'
  }
});
