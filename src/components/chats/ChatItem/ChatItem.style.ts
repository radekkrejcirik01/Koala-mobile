import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useChatItemStyle = createStyles((colors) => ({
  // Padding rather than margin, so the room between rows can be tapped too
  container: {
    paddingVertical: 12,
    paddingLeft: 10
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
    color: colors.textSecondary,
    fontWeight: '500'
  },
  messageView: {
    flexDirection: 'row',
    marginTop: 2
  },
  messageText: {
    color: colors.textSecondary,
    fontWeight: '500'
  },
  previewText: {
    flexShrink: 1
  },
  newItemText: {
    color: colors.text,
    fontWeight: 'bold'
  },
  newItem: {
    width: 11,
    height: 11,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: COLORS.PURPLE
  }
}));
