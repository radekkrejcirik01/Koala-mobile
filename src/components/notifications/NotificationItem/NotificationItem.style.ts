import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 10
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePhoto: {
    borderRadius: 22
  },
  contentView: {
    flex: 1,
    marginLeft: 15
  },
  titleText: {
    fontSize: 15,
    color: COLORS.BLACK,
    fontWeight: 'bold'
  },
  messageText: {
    marginTop: 2,
    color: COLORS.GRAY_200,
    fontWeight: '600'
  },
  newItemText: {
    color: COLORS.BLACK,
    fontWeight: 'bold'
  },
  newItem: {
    width: 11,
    height: 11,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: COLORS.PURPLE
  }
});
