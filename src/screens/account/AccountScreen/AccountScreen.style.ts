import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AccountScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 25,
    justifyContent: 'space-between'
  },
  buttonView: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE_100
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600'
  },
  descriptionText: {
    marginTop: 5,
    marginHorizontal: 15,
    color: COLORS.GRAY_200
  }
});
