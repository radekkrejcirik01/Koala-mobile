import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EditNameScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    paddingTop: 5,
    paddingHorizontal: 15
  },
  inputTitleText: {
    marginTop: 15,
    color: COLORS.BLACK,
    fontWeight: '500'
  },
  input: {
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: COLORS.GRAY_200,
    backgroundColor: COLORS.WHITE_100,
    fontWeight: '500'
  },
  button: {
    height: 45,
    width: 110,
    marginTop: 50,
    borderRadius: 18,
    alignSelf: 'center'
  }
});
