import { StyleSheet } from 'react-native';

export const LastlySharedCardStyle = StyleSheet.create({
  view: {
    width: '90%',
    height: 150,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {
    width: 65,
    height: 65,
    marginRight: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
