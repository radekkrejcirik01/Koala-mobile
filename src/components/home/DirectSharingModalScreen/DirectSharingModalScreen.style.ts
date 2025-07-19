import { StyleSheet } from 'react-native';

export const DirectSharingModalScreenStyle = StyleSheet.create({
  container: {
    height: '70%',
    paddingTop: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between'
  },
  inputView: {
    flex: 1
  },
  input: {
    fontSize: 18,
    textAlignVertical: 'top',
    fontWeight: 'bold'
  },
  send: {
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
