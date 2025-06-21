import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FirstScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 75,
    height: 75
  },
  titleText: {
    fontSize: 26,
    color: COLORS.BLACK_75,
    fontWeight: 'bold'
  },
  descriptionText: {
    marginTop: 10,
    color: COLORS.BLACK_75,
    fontWeight: '500'
  },
  startButton: {
    marginTop: '80%'
  },
  loginButtonView: {
    marginTop: '20%'
  },
  loginButtonText: {
    fontSize: 16,
    color: COLORS.BLACK_75,
    fontWeight: '600'
  }
});
