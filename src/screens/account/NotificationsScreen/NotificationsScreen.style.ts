import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    paddingBottom: 50,
    paddingHorizontal: 5
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
