import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyText: {
    marginTop: 100,
    paddingHorizontal: 60,
    fontSize: 16,
    color: COLORS.PURPLE,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '600'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
