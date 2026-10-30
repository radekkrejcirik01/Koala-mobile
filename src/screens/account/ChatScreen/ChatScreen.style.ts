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
