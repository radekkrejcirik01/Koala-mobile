import { createStyles } from '@utils/general/createStyles';

export const useSharedEmotionItemStyle = createStyles((colors) => ({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  emojiView: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface_200
  },
  emojiText: {
    color: colors.text,
    fontSize: 22
  },
  textView: {
    flex: 1,
    marginLeft: 14
  },
  messageText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  timeText: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textSecondary
  }
}));
