import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: '10%',
    fontSize: 30,
    color: COLORS.LIGHTGRAY_100,
    fontWeight: 'bold'
  },
  buttonView: {
    width: 100,
    height: 100,
    bottom: '20%',
    borderRadius: 30,
    backgroundColor: COLORS.PASTEL_PURPLE,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});
