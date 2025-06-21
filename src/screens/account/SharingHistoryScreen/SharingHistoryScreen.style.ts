import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharingHistoryScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  historyListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15
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
