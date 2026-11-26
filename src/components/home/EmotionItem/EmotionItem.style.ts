import { createStyles } from '@utils/general/createStyles';

export const useEmotionItemStyle = createStyles((colors) => ({
  container: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38
  },
  emoji: {
    color: colors.text,
    fontSize: 36
  }
}));
