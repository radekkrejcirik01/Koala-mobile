import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatListStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollViewContainer: {
    paddingLeft: 12,
    paddingRight: 10
  },
  separatorText: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_200
  },
  // Its time always sits right above it, the gap is kept below
  emotionView: {
    paddingBottom: 12
  },
  // A text message right under it gets more room
  emotionViewBeforeMessage: {
    paddingBottom: 30
  },
  lastItem: {
    paddingBottom: 20
  }
});
