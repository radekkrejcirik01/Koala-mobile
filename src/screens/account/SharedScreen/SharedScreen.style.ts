import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharedScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  historyListContainer: {
    paddingTop: 15
  },
  listEmptyText: {
    marginTop: 100,
    color: COLORS.GRAY_200,
    alignSelf: 'center',
    fontWeight: '500'
  },
  activityIndicator: {
    marginTop: 100
  }
});
