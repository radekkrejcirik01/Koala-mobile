import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusModalScreenStyle = StyleSheet.create({
  container: {
    minHeight: '50%',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE
  },
  titleText: {
    marginTop: 20,
    fontSize: 24,
    color: COLORS.BLACK,
    fontWeight: '600'
  },
  descriptionText: {
    marginTop: 5,
    color: COLORS.BLACK,
    fontSize: 12
  },
  expressionsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  expressionButtonView: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE_100
  },
  active: {
    borderWidth: 2,
    borderColor: COLORS.BUTTON_BLUE
  },
  expressionButtonText: {
    color: COLORS.BLACK,
    fontSize: 30
  },
  clearStatusButtonView: {
    marginTop: 15,
    alignSelf: 'center'
  },
  clearStatusButtonText: {
    color: COLORS.BUTTON_BLUE,
    fontWeight: '500'
  }
});
