import { createStyles } from '@utils/general/createStyles';

export const useFormIntroStyle = createStyles((colors) => ({
  container: {
    marginTop: 10,
    marginBottom: 50,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  emojiView: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    color: colors.text,
    fontSize: 30
  },
  title: {
    color: colors.text,
    marginTop: 14,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center'
  }
}));
