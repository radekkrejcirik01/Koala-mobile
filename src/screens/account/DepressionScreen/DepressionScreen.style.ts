import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DepressionScreenStyle = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center'
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center'
  },
  line: {
    marginHorizontal: 25,
    marginTop: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.LIGHTGRAY
  },
  messagesContainer: {
    paddingLeft: 25,
    paddingRight: 20
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
