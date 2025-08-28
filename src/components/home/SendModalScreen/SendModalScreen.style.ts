import { StyleSheet } from 'react-native';

export const SendModalScreenStyle = StyleSheet.create({
  container: {
    minHeight: '52%',
    paddingTop: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  messageText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  content: {
    flexGrow: 1,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  send: {
    width: '45%',
    paddingLeft: 10,
    paddingBottom: 70,
    alignItems: 'center'
  }
});
