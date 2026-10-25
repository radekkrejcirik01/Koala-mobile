import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeButtonStyle = StyleSheet.create({
  container: {
    width: 110,
    height: 52,
    borderRadius: 70,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
