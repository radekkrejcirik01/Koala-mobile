import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatHeaderStyle = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },
  acronym: {
    borderRadius: 25
  },
  namesView: {
    marginLeft: 10
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600'
  },
  usernameText: {
    fontSize: 12,
    color: COLORS.GRAY_200
  }
});
