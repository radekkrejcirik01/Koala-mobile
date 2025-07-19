import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddEmotionModalScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  titleText: {
    fontSize: 18,
    color: COLORS.PURPLE,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  inputTitleText: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold'
  },
  input: {
    height: 45,
    marginTop: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '500'
  },
  addView: {
    alignSelf: 'flex-end'
  },
  addText: {
    fontSize: 16,
    color: COLORS.BUTTON_BLUE,
    fontWeight: 'bold'
  }
});
