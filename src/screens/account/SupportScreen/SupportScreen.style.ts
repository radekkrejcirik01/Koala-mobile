import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SupportScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginTop: 20,
    marginLeft: 20
  },
  input: {
    height: 150,
    width: '90%',
    marginTop: 10,
    paddingTop: 15,
    padding: 15,
    fontSize: 16,
    borderRadius: 20,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE_200,
    textAlignVertical: 'top',
    alignSelf: 'center'
  },
  emailInput: {
    height: 50,
    width: '90%',
    marginTop: 10,
    paddingTop: 15,
    padding: 15,
    fontSize: 16,
    borderRadius: 20,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE_200,
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  thankText: {
    marginTop: 10,
    color: COLORS.BLACK
  }
});
