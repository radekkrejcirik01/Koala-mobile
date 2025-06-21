import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileHeaderStyle = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: COLORS.BLACK_75,
    fontWeight: 'bold'
  }
});
