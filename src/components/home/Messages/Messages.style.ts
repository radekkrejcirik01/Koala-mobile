import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesStyle = StyleSheet.create({
  titleText: {
    marginLeft: 20,
    fontSize: 18,
    color: COLORS.PURPLE,
    fontWeight: 'bold'
  },
  itemsContainer: {
    paddingTop: 15,
    paddingLeft: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  anxietyImage: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end'
  },
  depressionImage: {
    width: 65,
    height: 65,
    alignSelf: 'flex-end'
  },
  wellbeingImage: {
    width: 55,
    height: 55,
    alignSelf: 'flex-end'
  },
  kudosImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
    alignSelf: 'flex-end'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
