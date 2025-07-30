import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ForgotPasswordScreenStyle = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingHorizontal: 15
  },
  inputTitleText: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '500'
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  buttonView: {
    height: 45,
    width: '100%',
    marginTop: 35,
    borderRadius: 10,
    backgroundColor: COLORS.BUTTON_BLUE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});
