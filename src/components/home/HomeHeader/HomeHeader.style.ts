import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 25
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.BLACK
  },
  appName: {
    fontSize: 22,
    color: COLORS.LIGHTGRAY_200,
    fontWeight: 'bold'
  },
  title: {
    marginTop: 60,
    fontSize: 34,
    fontWeight: 'bold'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
