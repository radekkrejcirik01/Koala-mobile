import { StyleSheet } from 'react-native';

export const ShareScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  inputView: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20
  },
  input: {
    fontSize: 16.5,
    textAlignVertical: 'top',
    fontWeight: '500'
  },
  send: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
