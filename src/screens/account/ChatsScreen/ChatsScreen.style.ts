import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatsScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: 5,
    paddingBottom: 50,
    paddingHorizontal: 10
  },
  listEmptyText: {
    marginTop: 100,
    color: COLORS.GRAY_200,
    alignSelf: 'center',
    fontWeight: '500'
  }
});
