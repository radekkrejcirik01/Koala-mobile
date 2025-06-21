import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AndroidPromptStyle = StyleSheet.create({
  container: {
    width: '80%',
    height: 160,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '500'
  },
  input: {
    width: '100%',
    height: 35,
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE_100
  },
  buttonsView: {
    width: 175,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modal: {
    margin: 0
  }
});
