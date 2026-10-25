import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BadgeStyle = StyleSheet.create({
  view: {
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: COLORS.RED,
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});
