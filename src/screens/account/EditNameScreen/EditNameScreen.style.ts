import { StyleSheet } from 'react-native';

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
    fontWeight: '600'
  },
  input: {
    marginTop: 5,
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
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
