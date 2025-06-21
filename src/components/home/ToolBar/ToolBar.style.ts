import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToolBarStyle = StyleSheet.create({
  scrollView: {
    marginTop: 10
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    alignItems: 'center'
  },
  buttonContainerMargin: {
    marginLeft: 10,
    alignItems: 'center'
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: COLORS.WHITE_200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    marginTop: 2,
    color: COLORS.PURPLE,
    fontWeight: '600'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
