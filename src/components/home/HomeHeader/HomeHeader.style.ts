import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleView: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  title: {
    fontSize: 22,
    color: COLORS.PURPLE,
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
