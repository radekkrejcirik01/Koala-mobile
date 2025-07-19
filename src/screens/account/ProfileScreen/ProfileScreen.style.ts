import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  container: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  photoButton: {
    marginTop: -15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: COLORS.BUTTON_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  photoEmoji: {
    fontSize: 18,
    color: COLORS.BLACK
  },
  namesView: {
    alignItems: 'center'
  },
  name: {
    fontSize: 25,
    fontWeight: '600'
  },
  username: {
    fontSize: 16,
    color: COLORS.GRAY_200,
    fontWeight: '500'
  },
  buttonsContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 10
  },
  text: {
    marginTop: 5,
    alignSelf: 'center'
  }
});
