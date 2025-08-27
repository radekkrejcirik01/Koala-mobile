import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    color: COLORS.LIGHTGRAY_100,
    fontWeight: 'bold'
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
  }
});
