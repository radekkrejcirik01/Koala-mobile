import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BackButtonStyle = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    marginLeft: 5,
    backgroundColor: COLORS.WHITE_200
  },
  icon: {
    marginRight: 2
  }
});
