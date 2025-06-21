import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsHeaderStyle = StyleSheet.create({
  container: {
    paddingBottom: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  }
});
