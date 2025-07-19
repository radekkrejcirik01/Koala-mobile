import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FeedbackScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginTop: 20,
    marginHorizontal: 20,
    fontWeight: '600'
  },
  input: {
    height: 150,
    width: '90%',
    marginTop: 10,
    paddingTop: 15,
    padding: 15,
    fontSize: 16,
    borderRadius: 10,
    textAlignVertical: 'top',
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
