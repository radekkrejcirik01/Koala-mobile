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
  supportText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 26,
    fontSize: 13,
    color: COLORS.GRAY_200,
    textAlign: 'center'
  }
});
