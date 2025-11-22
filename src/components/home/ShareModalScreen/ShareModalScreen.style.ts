import { StyleSheet } from 'react-native';

export const ShareModalScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between'
  },
  inputView: {
    flex: 1
  },
  input: {
    fontSize: 16,
    textAlignVertical: 'top',
    fontWeight: '500'
  },
  send: {
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
