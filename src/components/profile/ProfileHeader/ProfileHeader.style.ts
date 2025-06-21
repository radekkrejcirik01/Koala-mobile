import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileHeaderStyle = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  }
});
