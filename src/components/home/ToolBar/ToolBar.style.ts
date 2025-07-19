import { StyleSheet } from 'react-native';

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
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    marginTop: 2,
    fontWeight: '600'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
