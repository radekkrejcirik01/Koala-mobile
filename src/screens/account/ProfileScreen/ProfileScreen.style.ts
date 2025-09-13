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
  photoContainer: {
    alignItems: 'center'
  },
  photoButton: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  photoText: {
    fontSize: 16,
    color: COLORS.PURPLE
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
  }
});
