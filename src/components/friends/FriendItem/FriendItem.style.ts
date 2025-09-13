import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendItemStyle = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  nameText: {
    marginTop: 5,
    fontWeight: 'bold',
    color: COLORS.LIGHTGRAY_100
  }
});
