import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AccountScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.NOTIFICATION_DOT
  }
});
