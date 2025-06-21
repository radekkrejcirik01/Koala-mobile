import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsHeaderStyle = StyleSheet.create({
  container: {
    paddingBottom: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: COLORS.BLACK_75,
    fontWeight: 'bold'
  }
});
