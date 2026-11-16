import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FirstScreenStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.BEIGE
  },
  container: {
    flex: 1
  },
  // Same height as HomeHeader so the buttons sit where they do on home
  header: {
    height: 55,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.BLACK
  },
  subtitleText: {
    marginTop: 20,
    paddingHorizontal: 40,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.LIGHTGRAY_200
  }
});
