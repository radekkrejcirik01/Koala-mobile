import { StyleSheet } from 'react-native';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginLeft: 2,
    fontSize: 22,
    fontWeight: '800'
  },
  buttonView: {
    width: 52,
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
});
