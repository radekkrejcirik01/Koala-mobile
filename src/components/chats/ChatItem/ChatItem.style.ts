import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatItemStyle = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginLeft: 10
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePhoto: {
    borderRadius: 22
  },
  contentView: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  titleText: {
    fontSize: 15,
    color: COLORS.GRAY_200,
    fontWeight: '500'
  },
  messageView: {
    flexDirection: 'row',
    marginTop: 2
  },
  messageText: {
    color: COLORS.GRAY_200,
    fontWeight: '500'
  },
  previewText: {
    flexShrink: 1
  },
  newItemText: {
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
