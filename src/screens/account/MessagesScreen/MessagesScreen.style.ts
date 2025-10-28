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
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 20
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
