import { createStyles } from '@utils/general/createStyles';

export const useChatNicknameScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  photoView: {
    marginTop: 16,
    alignItems: 'center'
  },
  input: {
    color: colors.text,
    height: 50,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    width: 'auto',
    height: 50,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 14
  }
}));
