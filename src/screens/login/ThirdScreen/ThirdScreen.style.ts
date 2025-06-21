import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ThirdScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 20,
    color: COLORS.BLACK_75,
    fontWeight: 'bold'
  },
  input: {
    height: 50,
    marginTop: 20,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 20,
    color: COLORS.BLACK_75,
    backgroundColor: COLORS.WHITE_100,
    fontWeight: 'bold'
  }
});
