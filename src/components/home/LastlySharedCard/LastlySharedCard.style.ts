import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LastlySharedCardStyle = StyleSheet.create({
  view: {
    width: '90%',
    height: 150,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_200,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  },
  button: {
    width: 65,
    height: 65,
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
